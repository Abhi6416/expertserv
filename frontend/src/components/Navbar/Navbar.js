/**
 * components/Navbar/Navbar.js — Enhanced Navigation Bar
 * -------------------------------------------------------
 * Changes: Logo image support, Home link added, Careers removed,
 * glassmorphism scroll effect, Roboto font, smooth animations.
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import logoImg from "../../assets/logo.png";

// NAV_LINKS: Home added, Careers removed
const NAV_LINKS = [
  { label: "Home",       href: "/",            type: "route"  },
  { label: "Products",   href: "/#products",   type: "anchor" },
  { label: "Industries", href: "/#industries", type: "anchor" },
  { label: "About Us",   href: "/#about",      type: "anchor" },
];

const Navbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [location]);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">

        {/* Logo — swap div for <img> once you have logo.png */}
        <Link to="/" className="navbar__logo" onClick={closeMobile}>
          {/*
            TO USE YOUR LOGO IMAGE:
            1. Copy your logo file to: frontend/src/assets/logo.png
            2. Add this import at the top: import logoImg from "../../assets/logo.png";
            3. Replace the div below with: <img src={logoImg} alt="ExpertServ Solution" className="navbar__logo-img" />
          */}
          <img
         src={logoImg}
         alt="ExpertServ Solutions"
         className="navbar__logo-img"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.type === "route" ? (
                  <Link
                    to={link.href}
                    className={`navbar__link ${location.pathname === link.href ? "navbar__link--active" : ""}`}
                  >{link.label}</Link>
                ) : (
                  <a href={link.href} className="navbar__link">{link.label}</a>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            {/* Theme Toggle */}
            <button className="navbar__theme-btn" onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
              <span className="theme-track">
                <span className="theme-thumb">
                  {isDark ? <FiMoon size={11} /> : <FiSun size={11} />}
                </span>
              </span>
            </button>
            <Link to="/contact" className="btn btn-primary navbar__cta">Contact Us</Link>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="navbar__mobile-controls">
          <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="theme-track">
              <span className="theme-thumb">{isDark ? <FiMoon size={11} /> : <FiSun size={11} />}</span>
            </span>
          </button>
          <button className="navbar__hamburger" onClick={() => setIsMobileOpen(p => !p)}
            aria-label="Toggle mobile menu" aria-expanded={isMobileOpen}>
            {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile-menu ${isMobileOpen ? "navbar__mobile-menu--open" : ""}`}>
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.type === "route" ? (
                <Link to={link.href} className="navbar__mobile-link" onClick={closeMobile}>{link.label}</Link>
              ) : (
                <a href={link.href} className="navbar__mobile-link" onClick={closeMobile}>{link.label}</a>
              )}
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-cta-wrap">
          <Link to="/contact" className="btn btn-primary navbar__mobile-cta" onClick={closeMobile}>
            Contact Us →
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
