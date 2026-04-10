/**
 * controllers/authController.js — Admin Authentication
 * ------------------------------------------------------
 * POST /api/auth/login  — Validates credentials, returns JWT
 * POST /api/auth/setup  — One-time admin account creation (dev only)
 */

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * loginAdmin
 * POST /api/auth/login
 * Validates username/password and returns a JWT token
 */
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ── Basic input check ──────────────────────────────────────────────────────
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // ── Find admin by username ─────────────────────────────────────────────────
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });

    if (!admin) {
      // Use generic message to avoid username enumeration attacks
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ── Compare password with stored hash ─────────────────────────────────────
    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ── Update lastLogin timestamp ─────────────────────────────────────────────
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    // ── Generate JWT ──────────────────────────────────────────────────────────
    // 👇 JWT_SECRET must be set in .env
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error("❌ loginAdmin error:", error.message);
    return res.status(500).json({ success: false, message: "Login failed. Try again." });
  }
};

/**
 * setupAdmin
 * POST /api/auth/setup
 * One-time route to create the initial admin account.
 * ⚠️ DISABLE this route in production after setup!
 */
const setupAdmin = async (req, res) => {
  try {
    // Prevent creating duplicate admin
    const existing = await Admin.findOne({});
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists. Use /api/auth/login.",
      });
    }

    // Create admin from env vars (or request body as fallback)
    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME || req.body.username || "admin",
      password: process.env.ADMIN_PASSWORD || req.body.password || "Admin@123",
      role: "superadmin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin account created. Please log in.",
      username: admin.username,
    });
  } catch (error) {
    console.error("❌ setupAdmin error:", error.message);
    return res.status(500).json({ success: false, message: "Setup failed" });
  }
};

module.exports = { loginAdmin, setupAdmin };
