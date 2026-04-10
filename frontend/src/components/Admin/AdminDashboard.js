/**
 * components/Admin/AdminDashboard.js — Admin Dashboard UI
 * ---------------------------------------------------------
 * Features:
 * - Stats cards (total, new, today's leads)
 * - Filter bar: date range, solution, state
 * - Leads table with pagination
 * - Export to CSV button
 * - Delete lead with confirmation
 * - Logout
 */

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./AdminDashboard.css";

// ── Indian States for filter dropdown ─────────────────────────────────────────
const STATES = [
  "Andhra Pradesh","Bihar","Delhi","Gujarat","Haryana","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Punjab","Rajasthan",
  "Tamil Nadu","Telangana","Uttar Pradesh","West Bengal",
];

const SOLUTIONS = ["IVR", "RCS", "SMS", "OTP"];

// ── Axios instance with auth token ────────────────────────────────────────────
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("expertserv-admin-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null); // ID pending confirmation

  // Filters
  const [filters, setFilters] = useState({
    startDate: "", endDate: "", solution: "", state: "",
  });

  // Pagination
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // ── Fetch Stats ──────────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get("/admin/stats");
      if (data.success) setStats(data.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  }, []);

  // ── Fetch Leads ──────────────────────────────────────────────────────────
  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { ...filters, page, limit: 15 };
      // Remove empty filters
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);

      const { data } = await api.get("/admin/leads", { params });
      if (data.success) {
        setLeads(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
      else toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // ── Initial load ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetchStats();
    fetchLeads(1);
  }, [fetchStats, fetchLeads]);

  // ── Filter change ─────────────────────────────────────────────────────────
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => fetchLeads(1);

  const handleClearFilters = () => {
    setFilters({ startDate: "", endDate: "", solution: "", state: "" });
    // Fetch will re-run via useEffect after state update
    setTimeout(() => fetchLeads(1), 50);
  };

  // ── Delete Lead ───────────────────────────────────────────────────────────
  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { data } = await api.delete(`/admin/leads/${deleteId}`);
      if (data.success) {
        toast.success("Lead deleted");
        setLeads((prev) => prev.filter((l) => l._id !== deleteId));
        fetchStats(); // Refresh stats
      }
    } catch {
      toast.error("Failed to delete lead");
    } finally {
      setDeleteId(null);
    }
  };

  // ── Export CSV ────────────────────────────────────────────────────────────
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("expertserv-admin-token");
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));

      // Trigger browser download via link
      const url = `${process.env.REACT_APP_API_URL || "/api"}/admin/leads/export?${params}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `leads_${Date.now()}.csv`;
      a.click();
      toast.success("CSV exported successfully");
    } catch {
      toast.error("Export failed. Please try again.");
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("expertserv-admin-token");
    navigate("/admin/login");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="admin-dashboard">
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <div className="sidebar-logo-icon">ES</div>
          <div>
            <div className="sidebar-logo-name">ExpertServ</div>
            <div className="sidebar-logo-role">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          <a href="#" className="sidebar-nav-item sidebar-nav-item--active">
            📊 Dashboard
          </a>
          <a href="#" className="sidebar-nav-item">📋 Leads</a>
          <a href="#" className="sidebar-nav-item">⚙️ Settings</a>
        </nav>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">Lead Dashboard</h1>
            <p className="admin-header__subtitle">
              Manage and track all incoming inquiries
            </p>
          </div>
          <div className="admin-header__actions">
            <button className="btn btn-outline admin-export-btn" onClick={handleExport}>
              ⬇️ Export CSV
            </button>
          </div>
        </div>

        {/* ── Stats Cards ───────────────────────────────────────────────── */}
        {stats && (
          <div className="admin-stats">
            {[
              { label: "Total Leads", value: stats.totalLeads, icon: "📊", color: "#1a56db" },
              { label: "New Leads", value: stats.newLeads, icon: "🔔", color: "#10b981" },
              { label: "Today's Leads", value: stats.todayLeads, icon: "📅", color: "#f59e0b" },
              { label: "Top Service", value: stats.byService[0]?._id || "—", icon: "⚡", color: "#8b5cf6" },
            ].map((s) => (
              <div key={s.label} className="admin-stat-card">
                <div className="admin-stat-card__icon" style={{ background: `${s.color}18`, color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <div className="admin-stat-card__value">{s.value}</div>
                  <div className="admin-stat-card__label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ───────────────────────────────────────────────────── */}
        <div className="admin-filters card">
          <div className="admin-filters__grid">
            <div className="form-group">
              <label className="form-label">From Date</label>
              <input
                type="date" name="startDate"
                className="form-input" value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">To Date</label>
              <input
                type="date" name="endDate"
                className="form-input" value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Solution</label>
              <select name="solution" className="form-input" value={filters.solution} onChange={handleFilterChange}>
                <option value="">All Solutions</option>
                {SOLUTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <select name="state" className="form-input" value={filters.state} onChange={handleFilterChange}>
                <option value="">All States</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-filters__actions">
            <button className="btn btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
            <button className="btn btn-outline" onClick={handleClearFilters}>Clear</button>
          </div>
        </div>

        {/* ── Leads Table ───────────────────────────────────────────────── */}
        <div className="admin-table-wrapper card">
          <div className="admin-table-header">
            <h2 className="admin-table-title">
              Leads <span className="lead-count">({pagination.total})</span>
            </h2>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="loading-spinner" />
              <p>Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="admin-empty">
              <p>📭 No leads found for the selected filters.</p>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>State</th>
                    <th>Solution</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr key={lead._id}>
                      <td>{(pagination.page - 1) * 15 + idx + 1}</td>
                      <td className="td-name">{lead.name}</td>
                      <td>
                        <a href={`mailto:${lead.email}`} className="table-link">{lead.email}</a>
                      </td>
                      <td>
                        <a href={`tel:${lead.phone}`} className="table-link">{lead.phone}</a>
                      </td>
                      <td>{lead.companyName}</td>
                      <td>{lead.state}</td>
                      <td>
                        <span className={`solution-badge solution-badge--${lead.solution.toLowerCase()}`}>
                          {lead.solution}
                        </span>
                      </td>
                      <td>{new Date(lead.createdAt).toLocaleDateString("en-IN")}</td>
                      <td>
                        <span className={`status-badge status-badge--${lead.status}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => confirmDelete(lead._id)}
                          title="Delete lead"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className="btn btn-outline pagination-btn"
                disabled={pagination.page <= 1}
                onClick={() => fetchLeads(pagination.page - 1)}
              >
                ← Previous
              </button>
              <span className="pagination-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                className="btn btn-outline pagination-btn"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchLeads(pagination.page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Delete Confirmation Modal ────────────────────────────────────── */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={cancelDelete}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Lead?</h3>
            <p>This action cannot be undone. The lead will be permanently removed from the database.</p>
            <div className="admin-modal__actions">
              <button className="btn btn-outline" onClick={cancelDelete}>Cancel</button>
              <button
                className="btn"
                style={{ background: "#ef4444", color: "#fff" }}
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
