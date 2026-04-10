/**
 * pages/AdminLoginPage.js — Admin Login Page Wrapper
 */
import React from "react";
import AdminLogin from "../components/Admin/AdminLogin";
import { ThemeProvider } from "../context/ThemeContext";
const AdminLoginPage = () => (
  <ThemeProvider>
    <AdminLogin />
  </ThemeProvider>
);
export default AdminLoginPage;
