/**
 * pages/NotFoundPage.js — 404 Page
 */
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div style={{
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 24px",
    fontFamily: "var(--font-body)",
  }}>
    <div style={{ fontSize: "80px", marginBottom: "16px" }}>🔭</div>
    <h1 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 800, marginBottom: "8px" }}>
      404
    </h1>
    <p style={{ fontSize: "18px", color: "var(--color-text-muted)", marginBottom: "28px" }}>
      Oops! This page doesn't exist.
    </p>
    <Link to="/" className="btn btn-primary">← Back to Home</Link>
  </div>
);

export default NotFoundPage;
