/**
 * ContactHero.js — Contact Page 1: Animated Hero
 * Updated: Roboto font, modern design, full-width layout
 */
import React, { useState, useEffect } from "react";
import "./ContactHero.css";

const CYCLING_WORDS = ["Connect", "Communicate", "Collaborate", "Convert"];
const STATS = [
  { value: "500+",  label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime SLA"          },
  { value: "50M+",  label: "Messages / Month"    },
  { value: "24/7",  label: "Expert Support"      },
];

const ContactHero = ({ onScrollToForm }) => {
  const [wordIndex,  setWordIndex]  = useState(0);
  const [isVisible,  setIsVisible]  = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => { setWordIndex(p => (p + 1) % CYCLING_WORDS.length); setIsVisible(true); }, 300);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="contact-hero" aria-label="Contact hero">
      <div className="contact-hero__bg-grid" aria-hidden="true" />
      <div className="contact-hero__bg-orb contact-hero__bg-orb--1" aria-hidden="true" />
      <div className="contact-hero__bg-orb contact-hero__bg-orb--2" aria-hidden="true" />

      <div className="container contact-hero__inner">
        {/* Left: Text */}
        <div className="contact-hero__text">
          <div className="contact-hero__badge animate-fadeInUp">
            <span className="badge-dot" />
            Get In Touch
          </div>

          <h1 className="contact-hero__title animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Let's{" "}
            <span className="contact-hero__cycling-word" style={{ opacity: isVisible ? 1 : 0 }}>
              {CYCLING_WORDS[wordIndex]}
            </span>
            <br />
            <span className="contact-hero__title--light">With ExpertServ</span>
          </h1>

          <p className="contact-hero__subtitle animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Transform your customer communications with enterprise-grade telecom solutions.
            Our experts are ready to craft the perfect IVR, RCS, SMS, or OTP strategy for your business.
          </p>

          <div className="contact-hero__ctas animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <button className="btn btn-primary" onClick={onScrollToForm}>
              Schedule a Consultation →
            </button>
          </div>

          <div className="contact-hero__stats animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            {STATS.map(s => (
              <div key={s.label} className="contact-hero__stat">
                <span className="contact-hero__stat-value">{s.value}</span>
                <span className="contact-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Poster */}
        <div className="contact-hero__visual animate-fadeInRight" style={{ animationDelay: "0.2s" }}>
          <div className="contact-hero__poster">
            <div className="poster-card poster-card--1">
              <div className="poster-card__icon">📱</div>
              <div><div className="poster-card__label">IVR System</div><div className="poster-card__value">Live & Active</div></div>
            </div>
            <div className="poster-card poster-card--2">
              <div className="poster-card__icon">💬</div>
              <div><div className="poster-card__label">SMS Delivered</div><div className="poster-card__value">1.2M Today</div></div>
            </div>
            <div className="poster-card poster-card--3">
              <div className="poster-card__icon">🔐</div>
              <div><div className="poster-card__label">OTP Success</div><div className="poster-card__value">99.7%</div></div>
            </div>
            <div className="poster-center">
              <div className="poster-center__ring poster-center__ring--outer" />
              <div className="poster-center__ring poster-center__ring--mid" />
              <div className="poster-center__ring poster-center__ring--inner" />
              <div className="poster-center__core"><span>ES</span></div>
            </div>
          </div>
        </div>
      </div>

      <button className="contact-hero__scroll-hint" onClick={onScrollToForm} aria-label="Scroll to form">
        <span>Fill the Form</span>
        <span className="scroll-hint-arrow">↓</span>
      </button>
    </section>
  );
};

export default ContactHero;
