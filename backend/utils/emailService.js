/**
 * utils/emailService.js — Nodemailer Email Notification Service
 * Updated: Better error logging for production debugging
 */

const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,   // smtp-relay.brevo.com
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendLeadNotification = async (leadData) => {
  try {
    // Log env variables presence (not values) for debugging
    console.log("📧 Email config check:", {
      host: process.env.EMAIL_HOST ? "✅ SET" : "❌ MISSING",
      port: process.env.EMAIL_PORT ? "✅ SET" : "❌ MISSING",
      user: process.env.EMAIL_USER ? "✅ SET" : "❌ MISSING",
      pass: process.env.EMAIL_PASS ? "✅ SET" : "❌ MISSING",
      to:   process.env.EMAIL_TO   ? "✅ SET" : "❌ MISSING",
    });

    const transporter = createTransporter();

    // Verify connection before sending
    await transporter.verify();
    console.log("✅ SMTP connection verified");

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

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"ExpertServ" <${process.env.EMAIL_USER}>`,
      to:   process.env.EMAIL_TO,
      subject: `🔔 New Lead: ${leadData.name} — ${leadData.solution} (${leadData.companyName})`,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully. Message ID:", info.messageId);
    return true;

  } catch (error) {
    // Detailed error logging for production debugging
    console.error("❌ Email failed. Error code:", error.code);
    console.error("❌ Email failed. Error message:", error.message);
    console.error("❌ Email failed. Full error:", JSON.stringify(error, null, 2));
    return false;
  }
};

module.exports = { sendLeadNotification };