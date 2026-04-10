/**
 * utils/emailService.js — Nodemailer Email Notification Service
 * --------------------------------------------------------------
 * Sends email alerts when a new lead submits the contact form.
 *
 * 👇 Configuration (set in .env):
 *    EMAIL_HOST     — SMTP host (e.g. smtp.gmail.com)
 *    EMAIL_PORT     — SMTP port (587 for TLS)
 *    EMAIL_USER     — Your Gmail address
 *    EMAIL_PASS     — Gmail App Password (NOT your real password)
 *                     → Gmail → Security → 2FA → App Passwords
 *    EMAIL_FROM     — Sender display name + email
 *    EMAIL_TO       — Recipient email for lead notifications
 */

const nodemailer = require("nodemailer");

// ── Create reusable transporter ───────────────────────────────────────────────
// This is created once and reused for all emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for port 465, false for 587
    auth: {
      // 👇 These come from your .env file
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * sendLeadNotification
 * Sends a formatted HTML email to the team when a new lead comes in.
 *
 * @param {Object} leadData — The contact form data
 * @returns {Promise<boolean>} — true if sent, false if failed
 */
const sendLeadNotification = async (leadData) => {
  try {
    const transporter = createTransporter();

    // ── Verify transporter config ─────────────────────────────────────────────
    await transporter.verify();

    // ── Build HTML email body ─────────────────────────────────────────────────
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
          <p style="color:#777; font-size:13px;">A new contact form submission was received.</p>

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
            <div class="value"><a href="tel:${leadData.phone}">${leadData.phone}</a></div>
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
            <div class="label">Solution Interested In</div>
            <div class="value"><span class="badge">${leadData.solution}</span></div>
          </div>
          <div class="field">
            <div class="label">Preferred Date & Time</div>
            <div class="value">${new Date(leadData.preferredDate).toLocaleDateString("en-IN", { dateStyle: "full" })} at ${leadData.preferredTime}</div>
          </div>
          <div class="footer">ExpertServ Solution CRM · Automated Lead Notification</div>
        </div>
      </body>
      </html>
    `;

    // ── Send the email ─────────────────────────────────────────────────────────
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ExpertServ" <noreply@expertserv.com>',
      to: process.env.EMAIL_TO || "leads@expertservsolution.com",
      subject: `🔔 New Lead: ${leadData.name} — ${leadData.solution} (${leadData.companyName})`,
      html: htmlContent,
    });

    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (error) {
    // Log but don't crash — notification failure shouldn't block form submission
    console.error("❌ Email notification failed:", error.message);
    return false;
  }
};

module.exports = { sendLeadNotification };
