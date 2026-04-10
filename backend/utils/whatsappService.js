/**
 * utils/whatsappService.js — DEPRECATED / NOT IN USE
 * ----------------------------------------------------
 * WhatsApp notification via Twilio has been removed as per requirements.
 * This file is kept for reference but is no longer imported anywhere.
 *
 * To re-enable:
 *  1. Uncomment the require in contactController.js
 *  2. Add Twilio credentials to .env
 *  3. Call sendWhatsAppNotification(lead) after saving the lead
 */

// const twilio = require("twilio");

// const sendWhatsAppNotification = async (leadData) => {
//   const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//   const message = await client.messages.create({
//     from: process.env.TWILIO_WHATSAPP_FROM,
//     to:   process.env.TWILIO_WHATSAPP_TO,
//     body: `New Lead: ${leadData.name} | ${leadData.solution} | ${leadData.phone}`,
//   });
//   return !!message.sid;
// };

// module.exports = { sendWhatsAppNotification };

module.exports = {};
