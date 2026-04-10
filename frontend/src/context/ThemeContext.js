/**
 * context/ThemeContext.js — Dark/Light Theme Context
 * ----------------------------------------------------
 * Provides theme state globally via React Context.
 * - Reads initial theme from localStorage (persists across sessions)
 * - Applies 'dark' class to <html> element for CSS targeting
 * - Smooth transition via CSS `transition` property on body
 */

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

/**
 * ThemeProvider
 * Wrap your app with this to make theme available everywhere.
 */
export const ThemeProvider = ({ children }) => {
  // ── Initialize from localStorage (default: 'light') ─────────────────────────
  const [theme, setTheme] = useState(() => {
    // Check if user previously set a theme
    const saved = localStorage.getItem("expertserv-theme");
    // Also respect OS-level dark mode preference
    if (!saved) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return saved || "light";
  });

  // ── Apply theme class to <html> whenever it changes ──────────────────────────
  useEffect(() => {
    const root = document.documentElement; // <html> element

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Persist to localStorage so it survives page refreshes
    localStorage.setItem("expertserv-theme", theme);
  }, [theme]);

  // ── Toggle between light and dark ─────────────────────────────────────────
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme — Custom hook for consuming theme context
 * Usage: const { theme, toggleTheme, isDark } = useTheme();
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
