/**
 * routes/contact.js — Contact Form Routes
 * -----------------------------------------
 * POST /api/contact/submit — Submit contact form
 */

const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController");

// POST /api/contact/submit
// Public route — no authentication required
router.post("/submit", submitContactForm);

module.exports = router;
