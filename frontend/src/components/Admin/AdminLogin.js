/**
 * components/Admin/AdminLogin.js — Admin Login Page
 * ---------------------------------------------------
 * Handles admin authentication.
 * On successful login, stores the JWT token in localStorage
 * and redirects to the dashboard.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    try {
      // POST to backend login route
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL || "/api"}/auth/login`,
        form
      );

      if (data.success) {
        // Store JWT token in localStorage
        localStorage.setItem("expertserv-admin-token", data.token);
        toast.success(`Welcome back, ${data.admin.username}!`);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      {/* Background decoration */}
      <div className="admin-login__bg-orb" />

      <div className="admin-login__card">
        {/* Logo */}
        <div className="admin-login__logo">
          <div className="admin-login__logo-icon">ES</div>
          <div>
            <div className="admin-login__logo-name">ExpertServ</div>
            <div className="admin-login__logo-sub">Admin Panel</div>
          </div>
        </div>

        <h1 className="admin-login__title">Sign In</h1>
        <p className="admin-login__subtitle">
          Access the lead management dashboard
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login__form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username" name="username" type="text"
              className="form-input"
              placeholder="admin"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password" name="password"
                type={showPass ? "text" : "password"}
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPass((p) => !p)}
                aria-label="Toggle password visibility"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="admin-login__error">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary admin-login__submit"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" /> Signing in...</>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <p className="admin-login__footer">
          Forgot credentials? Contact your system administrator.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
