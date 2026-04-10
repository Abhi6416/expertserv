/**
 * routes/admin.js — Admin Dashboard Routes
 * ------------------------------------------
 * All routes require a valid JWT token (protect middleware).
 *
 * GET    /api/admin/leads         — Get leads with filters & pagination
 * GET    /api/admin/leads/export  — Export filtered leads to CSV
 * DELETE /api/admin/leads/:id     — Delete a single lead
 * GET    /api/admin/stats         — Dashboard overview statistics
 */

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getLeads,
  exportLeads,
  deleteLead,
  getDashboardStats,
} = require("../controllers/adminController");

// Apply JWT protection to all admin routes below
router.use(protect);

router.get("/leads", getLeads);
router.get("/leads/export", exportLeads); // Must be before /:id route
router.delete("/leads/:id", deleteLead);
router.get("/stats", getDashboardStats);

module.exports = router;
