/**
 * routes/auth.js — Authentication Routes
 * ----------------------------------------
 * POST /api/auth/login — Admin login
 * POST /api/auth/setup — One-time admin creation (disable in prod)
 */

const express = require("express");
const router = express.Router();
const { loginAdmin, setupAdmin } = require("../controllers/authController");

router.post("/login", loginAdmin);
router.post("/setup", setupAdmin); // ⚠️ Remove/disable this in production

module.exports = router;
