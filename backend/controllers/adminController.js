/**
 * controllers/adminController.js — Admin Dashboard Controller
 * ------------------------------------------------------------
 * Handles all admin operations on leads:
 *   - GET  /api/admin/leads       — Fetch leads with filters
 *   - GET  /api/admin/leads/export — Export filtered leads to CSV
 *   - DELETE /api/admin/leads/:id — Delete a lead
 *   - GET  /api/admin/stats       — Dashboard statistics
 *
 * All routes are protected by JWT auth middleware.
 */

const Lead = require("../models/Lead");
const { Parser } = require("json2csv");

/**
 * getLeads
 * GET /api/admin/leads
 * Supports filters: startDate, endDate, solution, state, status
 * Supports pagination: page, limit
 */
const getLeads = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      solution,
      state,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    // ── Build MongoDB filter object ────────────────────────────────────────────
    const filter = {};

    // Date range filter on createdAt
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include the full end day
        filter.createdAt.$lte = end;
      }
    }

    // Exact match filters
    if (solution) filter.solution = solution;
    if (state) filter.state = state;
    if (status) filter.status = status;

    // ── Pagination ─────────────────────────────────────────────────────────────
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // ── Fetch leads from DB ────────────────────────────────────────────────────
    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: -1 }) // Newest first
        .skip(skip)
        .limit(limitNum)
        .lean(), // .lean() returns plain JS objects — faster for read-only
      Lead.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("❌ getLeads error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to fetch leads" });
  }
};

/**
 * exportLeads
 * GET /api/admin/leads/export
 * Exports filtered leads as a downloadable CSV file
 */
const exportLeads = async (req, res) => {
  try {
    const { startDate, endDate, solution, state, status } = req.query;

    // ── Build same filter as getLeads ─────────────────────────────────────────
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }
    if (solution) filter.solution = solution;
    if (state) filter.state = state;
    if (status) filter.status = status;

    // ── Fetch ALL matching leads (no pagination for export) ───────────────────
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).lean();

    if (leads.length === 0) {
      return res.status(404).json({ success: false, message: "No leads found for the selected filters" });
    }

    // ── Define CSV columns ─────────────────────────────────────────────────────
    const fields = [
      { label: "ID", value: "_id" },
      { label: "Name", value: "name" },
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Company", value: "companyName" },
      { label: "State", value: "state" },
      { label: "Solution", value: "solution" },
      { label: "Preferred Date", value: (row) => new Date(row.preferredDate).toLocaleDateString("en-IN") },
      { label: "Preferred Time", value: "preferredTime" },
      { label: "Status", value: "status" },
      { label: "Email Sent", value: (row) => (row.emailSent ? "Yes" : "No") },
      { label: "WhatsApp Sent", value: (row) => (row.whatsappSent ? "Yes" : "No") },
      { label: "Submitted At", value: (row) => new Date(row.createdAt).toLocaleString("en-IN") },
    ];

    // ── Convert to CSV ─────────────────────────────────────────────────────────
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    // ── Set response headers for file download ─────────────────────────────────
    const filename = `leads_export_${Date.now()}.csv`;
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    return res.send(csv);
  } catch (error) {
    console.error("❌ exportLeads error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to export leads" });
  }
};

/**
 * deleteLead
 * DELETE /api/admin/leads/:id
 */
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    console.log(`🗑️ Lead deleted: ${id} by admin ${req.admin.username}`);
    return res.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("❌ deleteLead error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to delete lead" });
  }
};

/**
 * getDashboardStats
 * GET /api/admin/stats
 * Returns quick stats for the admin dashboard overview
 */
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalLeads,
      newLeads,
      todayLeads,
      byService,
      byState,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      }),
      Lead.aggregate([
        { $group: { _id: "$solution", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $group: { _id: "$state", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    return res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        todayLeads,
        byService,
        byState,
      },
    });
  } catch (error) {
    console.error("❌ getDashboardStats error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};

module.exports = { getLeads, exportLeads, deleteLead, getDashboardStats };
