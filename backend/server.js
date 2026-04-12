/**
 * server.js — ExpertServ Solution Backend
 * ----------------------------------------
 * Entry point for the Express application.
 * Sets up middleware, connects to MongoDB, and mounts all API routes.
 */

// Load environment variables from .env file FIRST (before any other imports)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ── Import Routes ─────────────────────────────────────────────────────────────
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// ── App Initialization ────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

// ── Global Middleware ─────────────────────────────────────────────────────────

// CORS — supports both local development and production
    app.use(
      cors({
        origin: function (origin, callback) {
          const allowedOrigins = [
            "http://localhost:3000",
            process.env.FRONTEND_URL,
          ];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );

// Parse incoming JSON request bodies (max 10mb)
app.use(express.json({ limit: "10mb" }));

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ── Health Check Route ────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "ExpertServ API is running 🚀" });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/contact", contactRoutes);   // Contact form submissions
app.use("/api/admin", adminRoutes);       // Admin dashboard (protected)
app.use("/api/auth", authRoutes);         // Admin login / auth

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ ExpertServ backend running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
