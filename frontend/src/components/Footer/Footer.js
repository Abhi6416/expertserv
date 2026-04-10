/**
 * components/Footer/Footer.js — Enhanced Full-Width Footer
 * ----------------------------------------------------------
 * Changes: Logo image support, larger fonts, full-width layout,
 * gradient accents, improved spacing, Roboto font.
 */

import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiLinkedin, FiTwitter, FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import "./Footer.css";
import logoImg from "../../assets/logo.png";

const QUICK_LINKS = [
  { label: "Home",         to: "/"           },
  { label: "About Us",     to: "/#about"     },
  { label: "Contact Us",   to: "/contact"    },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms-of-use"   },
];

const PRODUCTS = ["IVR Solutions", "RCS Messaging", "Bulk SMS", "OTP Services", "WhatsApp Business", "Voice Broadcasting"];
const INDUSTRIES = ["Banking & Finance", "Healthcare", "E-Commerce", "Logistics", "Education", "Government"];

const SOCIAL_LINKS = [
  { icon: <FiLinkedin />,  href: "https://linkedin.com",  label: "LinkedIn"  },
  { icon: <FiTwitter />,   href: "https://twitter.com",   label: "Twitter"   },
  { icon: <FiFacebook />,  href: "https://facebook.com",  label: "Facebook"  },
  { icon: <FiInstagram />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FiYoutube />,   href: "https://youtube.com",   label: "YouTube"   },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Gradient top border */}
      <div className="footer__top-border" aria-hidden="true" />

      <div className="footer__main">
        <div className="container footer__grid">

          {/* ── Brand Column ─────────────────────────────────────────────── */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              {/*
                TO USE LOGO IMAGE:
                import logoImg from "../../assets/logo.png";
                <img src={logoImg} alt="ExpertServ Solution" className="footer__logo-img" />
              */}
              <img src={logoImg} alt="ExpertServ Solution" className="footer__logo-img" />
              <div>
                <div className="footer__logo-name">ExpertServ</div>
                <div className="footer__logo-sub">Solutions</div>
              </div>
            </Link>

            <p className="footer__tagline">
              Empowering businesses with cutting-edge telecom solutions —
              IVR, RCS, SMS & OTP services built for scale and reliability.
            </p>

            <div className="footer__social">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} className="footer__social-link">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact Column ───────────────────────────────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <ul className="footer__contact-list">
              <li>
                <FiMapPin className="footer__contact-icon" />
                <span>Dharma Cloth Market Atta, Sector - 27,<br />Noida, UP — 201301, India</span>
              </li>
              <li>
                <FiMail className="footer__contact-icon" />
                <a href="mailto:info@expertservsolution.com">supportexpertservsolutions@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* ── Quick Links ──────────────────────────────────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__link-list">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* ── Products ─────────────────────────────────────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Products</h4>
            <ul className="footer__link-list">
              {PRODUCTS.map((p) => (
                <li key={p}><a href="/#products" className="footer__link">{p}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Industries ───────────────────────────────────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Industries</h4>
            <ul className="footer__link-list">
              {INDUSTRIES.map((i) => (
                <li key={i}><a href="/#industries" className="footer__link">{i}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────────────────── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">© {year} ExpertServ Solutions. All rights reserved.</p>
          <div className="footer__legal">
            <Link to="/privacy-policy" className="footer__legal-link">Privacy Policy</Link>
            <span className="footer__sep">|</span>
            <Link to="/terms-of-use" className="footer__legal-link">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
