/**
 * utils/emailService.js — Brevo HTTP API Email Service
 * ------------------------------------------------------
 * Uses Brevo HTTP API instead of SMTP.
 * HTTP works on all servers including Render free tier.
 * SMTP port 587/465 is blocked on Render free tier.
 *
 * Required env variable:
 *   BREVO_API_KEY — from Brevo dashboard → SMTP & API → API Keys
 *   EMAIL_TO      — where to send lead notifications
 *   EMAIL_FROM    — your verified sender email in Brevo
 */

const axios = require("axios");

const sendLeadNotification = async (leadData) => {
  try {
    // Check required env variables
    console.log("📧 Email config check:", {
      apiKey: process.env.BREVO_API_KEY ? "✅ SET" : "❌ MISSING",
      to:     process.env.EMAIL_TO      ? "✅ SET" : "❌ MISSING",
      from:   process.env.EMAIL_FROM    ? "✅ SET" : "❌ MISSING",
    });

    if (!process.env.BREVO_API_KEY) {
      console.error("❌ BREVO_API_KEY is not set");
      return false;
    }

    // Build HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          .container { background: #fff; border-radius: 8px; padding: 30px; max-width: 600px; margin: auto; }
          h2 { color: #0a4fa8; border-bottom: 2px solid #0a4fa8; padding-bottom: 10px; }
          .field { margin: 12px 0; }
          .label { font-weight: bold; color: #555; font-size: 13px; text-transform: uppercase; }
          .value { font-size: 15px; color: #222; margin-top: 3px; }
          .badge { display: inline-block; background: #0a4fa8; color: white; padding: 3px 10px; border-radius: 12px; font-size: 13px; }
          .footer { margin-top: 30px; font-size: 12px; color: #aaa; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🔔 New Lead — ExpertServ Solution</h2>
          <p style="color:#777;font-size:13px;">A new contact form submission was received.</p>
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${leadData.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${leadData.email}">${leadData.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${leadData.phone}</div>
          </div>
          <div class="field">
            <div class="label">Company</div>
            <div class="value">${leadData.companyName}</div>
          </div>
          <div class="field">
            <div class="label">State</div>
            <div class="value">${leadData.state}</div>
          </div>
          <div class="field">
            <div class="label">Solution</div>
            <div class="value"><span class="badge">${leadData.solution}</span></div>
          </div>
          <div class="field">
            <div class="label">Preferred Date & Time</div>
            <div class="value">
              ${new Date(leadData.preferredDate).toLocaleDateString("en-IN", { dateStyle: "full" })}
              at ${leadData.preferredTime}
            </div>
          </div>
          <div class="footer">ExpertServ Solution CRM · Automated Lead Notification</div>
        </div>
      </body>
      </html>
    `;

    // Extract sender email from EMAIL_FROM env variable
    // EMAIL_FROM format: "ExpertServ Solution <email@domain.com>"
    const fromEmail = process.env.EMAIL_FROM
      ? process.env.EMAIL_FROM.match(/<(.+)>/)?.[1] || process.env.EMAIL_FROM
      : process.env.EMAIL_USER;

    const fromName = process.env.EMAIL_FROM
      ? process.env.EMAIL_FROM.split("<")[0].trim().replace(/"/g, "")
      : "ExpertServ Solution";

    // Send via Brevo HTTP API — works on all servers
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name:  fromName,
          email: fromEmail,
        },
        to: [
          { email: process.env.EMAIL_TO },
        ],
        subject: `🔔 New Lead: ${leadData.name} — ${leadData.solution} (${leadData.companyName})`,
        htmlContent: htmlContent,
      },
      {
        headers: {
          "accept":       "application/json",
          "content-type": "application/json",
          "api-key":      process.env.BREVO_API_KEY,
        },
        timeout: 15000, // 15 second timeout
      }
    );

    console.log("✅ Email sent via Brevo API. MessageId:", response.data.messageId);
    return true;

  } catch (error) {
    console.error("❌ Email failed:", error.response?.data || error.message);
    return false;
  }
};

module.exports = { sendLeadNotification };