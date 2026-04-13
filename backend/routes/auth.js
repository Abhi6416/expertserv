/**
 * routes/auth.js — Authentication Routes
 * ----------------------------------------
 * POST /api/auth/login — Admin login
 * POST /api/auth/setup — One-time admin creation (disable in prod)
 */

const express = require("express");
const router = express.Router();
const { loginAdmin, setupAdmin } = require("../controllers/authController");

// ── Auth Routes ─────────────────────────────────────────
router.post("/login", loginAdmin);
router.post("/setup", setupAdmin); // ⚠️ Remove/disable this in production

// ── TEMPORARY TEST ROUTE (Email Testing) ─────────────────
// ⚠️ Remove after confirming email functionality
router.get("/test-email", async (req, res) => {
  try {
    const { sendLeadNotification } = require("../utils/emailService");

    const result = await sendLeadNotification({
      name: "Test User",
      email: "test@test.com",
      phone: "9876543210",
      companyName: "Test Company",
      state: "Delhi",
      solution: "IVR",
      preferredDate: new Date(),
      preferredTime: "10:00 AM",
    });

    res.json({
      success: result,
      message: result
        ? "✅ Email sent! Check inbox."
        : "❌ Failed. Check Render logs.",
    });

  } catch (error) {
    console.error("Test Email Error:", error);
    res.status(500).json({
      success: false,
      message: "❌ Server error while sending email",
    });
  }
});

module.exports = router;
