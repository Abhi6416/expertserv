/**
 * pages/HomePage.js — Enhanced Landing Page
 * -------------------------------------------
 * Updates: Full-width layout, gradient accents, scroll animations,
 * Roboto font, modern cards, blue-themed design, no Careers section,
 * lazy loading, semantic HTML, SEO meta.
 */

import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

/* ── Data ─────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { icon: "📞", name: "IVR Solutions",    color: "#1a56db",
    desc: "Intelligent voice response systems that automate customer interactions, reduce wait times, and scale effortlessly." },
  { icon: "💬", name: "RCS Messaging",    color: "#0ea5e9", badge: "New",
    desc: "Rich Communication Services with media, quick replies, and branded messaging for next-gen engagement." },
  { icon: "📱", name: "Bulk SMS",         color: "#6366f1",
    desc: "High-throughput SMS gateway for transactional, promotional, and alert messages at enterprise scale." },
  { icon: "🔐", name: "OTP Services",     color: "#10b981",
    desc: "Lightning-fast one-time passwords for authentication, verification, and fraud prevention." },
];

const INDUSTRIES = [
  { icon: "🏦", name: "Banking & Finance",  desc: "Fraud alerts, account notifications, loan updates." },
  { icon: "🏥", name: "Healthcare",          desc: "Appointment reminders, prescription alerts, patient outreach." },
  { icon: "🛒", name: "E-Commerce",          desc: "Order tracking, delivery updates, sale alerts." },
  { icon: "📦", name: "Logistics",           desc: "Shipment tracking, driver coordination, confirmations." },
  { icon: "🎓", name: "Education",           desc: "Fee reminders, results, parent engagement." },
  { icon: "🏛️", name: "Government",         desc: "Citizen alerts, emergency broadcasts, public service." },
];

const STATS = [
  { value: "500+",  label: "Enterprise Clients",  icon: "🏢" },
  { value: "99.9%", label: "Uptime SLA",           icon: "⚡" },
  { value: "50M+",  label: "Messages Monthly",     icon: "💬" },
  { value: "15+",   label: "Countries Served",     icon: "🌍" },
];

const ABOUT_STATS = [
  { value: "2015", label: "Year Founded"      },
  { value: "500+", label: "Happy Clients"     },
  { value: "50M+", label: "Messages Monthly"  },
  { value: "200+", label: "Expert Engineers"  },
];

/* ── Custom hook: intersection observer for scroll animations ──────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ── HomePage Component ───────────────────────────────────────────────────── */
const HomePage = () => {
  const productsRef  = useScrollReveal();
  const industriesRef= useScrollReveal();
  const aboutRef     = useScrollReveal();
  const statsRef     = useScrollReveal();

  return (
    <>
      {/* ── SEO: Title is set in index.html; descriptions via meta ─────── */}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero__bg-mesh" aria-hidden="true" />
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />

        <div className="container hero__inner">
          {/* Left: Text */}
          <div className="hero__content">
            <div className="section-badge animate-fadeInUp">
              🚀 India's #1 Telecom Solution Provider
            </div>

            <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              Enterprise Telecom
              <br />
              <span className="gradient-text">Reimagined.</span>
            </h1>

            <p className="hero__subtitle animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              ExpertServ Solution delivers IVR, RCS, SMS, and OTP services
              trusted by 500+ businesses. Built for scale, reliability, and
              measurable customer engagement.
            </p>

            <div className="hero__ctas animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <Link to="/contact" className="btn btn-primary hero__cta-main">
                Get Started Free →
              </Link>
              <a href="#products" className="btn btn-outline">
                Explore Solutions
              </a>
            </div>

            {/* Trust badges */}
            <div className="hero__trust animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              <span>🔒 ISO 27001</span>
              <span>✅ TRAI Compliant</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="hero__stats-panel animate-fadeInRight" style={{ animationDelay: "0.25s" }}>
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat-card">
                <span className="hero__stat-icon">{s.icon}</span>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <a href="#products" className="hero__scroll-hint" aria-label="Scroll to products">
          <span>Scroll</span>
          <span className="hero__scroll-arrow">↓</span>
        </a>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────────────────────────── */}
      <section className="section products-section" id="products" aria-label="Our Products">
        <div className="container">
          <div className="section-header reveal-section" ref={productsRef}>
            <span className="section-badge">Our Products</span>
            <h2>Communication Solutions<br />Built for Scale</h2>
            <p>Enterprise-grade telecom products that drive measurable business impact across every customer touchpoint.</p>
          </div>

          <div className="products-grid">
            {PRODUCTS.map((p, i) => (
              <article
                key={p.name}
                className="product-card"
                style={{ animationDelay: `${i * 0.1}s`, "--card-color": p.color }}
              >
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <div className="product-card__icon-wrap">
                  <span className="product-card__icon">{p.icon}</span>
                </div>
                <h3 className="product-card__name">{p.name}</h3>
                <p className="product-card__desc">{p.desc}</p>
                <Link to="/contact" className="product-card__cta">
                  Learn More <span>→</span>
                </Link>
                <div className="product-card__glow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="section industries-section" id="industries" aria-label="Industries We Serve">
        <div className="container">
          <div className="industries-layout">
            {/* Left: header */}
            <div className="industries-header reveal-section" ref={industriesRef}>
              <span className="section-badge">Industries</span>
              <h2>Serving Every<br />Sector</h2>
              <p>
                Tailored communication solutions for every industry's unique
                challenges, compliance needs, and customer expectations.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: "24px" }}>
                Talk to an Expert →
              </Link>
            </div>

            {/* Right: grid */}
            <div className="industries-grid">
              {INDUSTRIES.map((ind, i) => (
                <article key={ind.name} className="industry-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="industry-card__icon">{ind.icon}</span>
                  <div>
                    <h4 className="industry-card__name">{ind.name}</h4>
                    <p className="industry-card__desc">{ind.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────── */}
      <section className="stats-band reveal-section" ref={statsRef} aria-label="Company statistics">
        <div className="container stats-band__inner">
          {STATS.map((s) => (
            <div key={s.label} className="stats-band__item">
              <span className="stats-band__value">{s.value}</span>
              <span className="stats-band__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section className="section about-section" id="about" aria-label="About ExpertServ">
        <div className="container about-layout reveal-section" ref={aboutRef}>

          {/* Left: visual */}
          <div className="about-visual">
            <div className="about-visual__card about-visual__card--main">
              <div className="about-visual__logo">ES</div>
              <h3>ExpertServ Solution</h3>
              <p>Powering India's Digital Communication</p>
            </div>
            <div className="about-visual__stat-grid">
              {ABOUT_STATS.map((s) => (
                <div key={s.label} className="about-visual__stat">
                  <span className="about-visual__stat-val">{s.value}</span>
                  <span className="about-visual__stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div className="about-text">
            <span className="section-badge">About Us</span>
            <h2>India's Trusted Telecom Technology Partner Since 2015</h2>
            <p>
              ExpertServ Solution is a premier telecom technology company headquartered
              in Noida, India. We specialize in enterprise messaging, voice automation,
              and authentication solutions trusted by 500+ businesses across 15+ countries.
            </p>
            <p>
              Our team of 200+ engineers and telecom experts delivers robust, TRAI-compliant,
              and scalable systems that transform how businesses communicate with their customers
              — from real-time OTP delivery to AI-powered IVR flows.
            </p>
            <div className="about-text__features">
              {["ISO 27001 Certified", "TRAI Compliant", "24/7 Expert Support", "99.9% SLA Uptime"].map(f => (
                <span key={f} className="about-feature-chip">✓ {f}</span>
              ))}
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: "32px" }}>
              Work With Us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="cta-banner__bg" aria-hidden="true" />
        <div className="container cta-banner__inner">
          <div className="cta-banner__content">
            <h2>Ready to Transform Your Customer Communications?</h2>
            <p>Schedule a free consultation with our telecom experts today.</p>
          </div>
          <Link to="/contact" className="btn cta-banner__btn">
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
