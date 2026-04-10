/**
 * App.js — Root Application Component
 * Updated: Lazy loading for all pages, code splitting, Suspense fallback
 */
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

/* ── Lazy-loaded pages (code splitting) ─────────────────────────────────────
 * Each page is loaded only when the user navigates to it.
 * Reduces initial bundle size significantly.
 */
const HomePage             = lazy(() => import("./pages/HomePage"));
const ContactPage          = lazy(() => import("./pages/ContactPage"));
const AdminLoginPage       = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboardPage   = lazy(() => import("./pages/AdminDashboardPage"));
const PrivacyPolicyPage    = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage            = lazy(() => import("./pages/TermsPage"));
const NotFoundPage         = lazy(() => import("./pages/NotFoundPage"));

/* ── Page Loading Fallback ──────────────────────────────────────────────── */
const PageLoader = () => (
  <div style={{
    minHeight: "60vh", display: "flex", alignItems: "center",
    justifyContent: "center", flexDirection: "column", gap: "16px",
    fontFamily: "'Roboto', sans-serif", color: "var(--color-text-muted)",
  }}>
    <div style={{
      width: "36px", height: "36px",
      border: "3px solid var(--color-border)",
      borderTopColor: "var(--color-primary)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
    <span style={{ fontSize: "14px" }}>Loading...</span>
  </div>
);

/* ── Protected Route guard ──────────────────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("expertserv-admin-token");
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { fontFamily: "'Roboto', sans-serif", fontSize: "14px" },
          }}
        />
        <Routes>
          {/* Admin routes — no Navbar/Footer */}
          <Route path="/admin/login" element={
            <Suspense fallback={<PageLoader />}><AdminLoginPage /></Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}><AdminDashboardPage /></Suspense>
            </ProtectedRoute>
          } />

          {/* Public routes — with Navbar + Footer */}
          <Route path="/*" element={
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <main style={{ flex: 1, paddingTop: "var(--nav-height)" }}>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/"               element={<HomePage />} />
                    <Route path="/contact"         element={<ContactPage />} />
                    <Route path="/privacy-policy"  element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-use"    element={<TermsPage />} />
                    <Route path="*"               element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
