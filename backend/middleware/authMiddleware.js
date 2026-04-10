/**
 * middleware/authMiddleware.js — JWT Authentication Guard
 * --------------------------------------------------------
 * Protects admin routes by validating the JWT token
 * sent in the Authorization header.
 *
 * Usage: Apply to any route that requires admin login
 *   router.get("/leads", protect, getLeads);
 */

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  // ── Extract token from Authorization header ───────────────────────────────
  // Expected format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token provided → reject
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  try {
    // ── Verify and decode the token ─────────────────────────────────────────
    // jwt.verify throws if the token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ── Attach admin user to request ─────────────────────────────────────────
    // So downstream route handlers can access req.admin
    req.admin = await Admin.findById(decoded.id).select("-password");

    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    next(); // Token is valid — proceed to the route handler
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token is invalid or has expired. Please log in again.",
    });
  }
};

module.exports = { protect };
