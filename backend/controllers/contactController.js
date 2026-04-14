/**
 * controllers/contactController.js — Contact Form Handler
 * Email notification removed for faster form submission.
 * Leads are saved directly to MongoDB.
 */

const axios  = require("axios");
const Lead   = require("../models/Lead");

const submitContactForm = async (req, res) => {
  try {
    const {
      name, email, phone, companyName,
      state, solution, preferredDate, preferredTime,
      agreedToPolicy, recaptchaToken,
    } = req.body;

    // ── Step 1: Verify reCAPTCHA ──────────────────────────────────────────
    const recaptchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret:   process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
          remoteip: req.ip,
        },
        timeout: 5000, // 5 second timeout for reCAPTCHA
      }
    );

    if (!recaptchaRes.data.success) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
        errors: { recaptcha: "reCAPTCHA verification failed" },
      });
    }

    // ── Step 2: Server-side validation ───────────────────────────────────
    const errors = {};
    if (!name || name.trim().length < 2)
      errors.name = "Full name is required";
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      errors.email = "Valid email is required";
    if (!phone || !/^[6-9]\d{9}$/.test(phone))
      errors.phone = "Valid 10-digit mobile number required";
    if (!companyName || companyName.trim().length < 2)
      errors.companyName = "Company name is required";
    if (!state)
      errors.state = "State is required";
    if (!solution || !["IVR","RCS","SMS","OTP"].includes(solution))
      errors.solution = "Select a valid solution";
    if (!preferredDate)
      errors.preferredDate = "Preferred date is required";
    if (!preferredTime)
      errors.preferredTime = "Preferred time is required";
    if (!agreedToPolicy)
      errors.agreedToPolicy = "You must agree to the Privacy Policy";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // ── Step 3: Save lead to MongoDB ──────────────────────────────────────
    const lead = await Lead.create({
      name:         name.trim(),
      email:        email.trim().toLowerCase(),
      phone,
      companyName:  companyName.trim(),
      state,
      solution,
      preferredDate: new Date(preferredDate),
      preferredTime,
      agreedToPolicy,
      ipAddress:    req.ip,
    });

    console.log(`✅ New lead saved: ${lead._id} — ${lead.name} (${lead.solution})`);

    // ── Step 4: Return success immediately ───────────────────────────────
    // Email removed — response sent right after DB save for faster UX
    return res.status(201).json({
      success: true,
      message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
      leadId:  lead._id,
    });

  } catch (error) {
    console.error("❌ Contact form error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

module.exports = { submitContactForm };