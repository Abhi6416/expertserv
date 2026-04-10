/**
 * ContactConfirmation.js — Page 3: What Happens Next
 * ----------------------------------------------------
 * UPDATED: Removed "Need to reach us directly" (Call/WhatsApp/Email buttons).
 * Replaced with a single "Contact Us" button that scrolls to/opens form.
 * All "Call Now" options removed as requested.
 */

import React from "react";
import { Link } from "react-router-dom";
import "./ContactConfirmation.css";

const STEPS = [
  { step: "01", icon: "📋", title: "Form Received",
    desc: "Your inquiry is instantly logged and a confirmation is sent to your email within minutes." },
  { step: "02", icon: "👤", title: "Expert Assigned",
    desc: "A domain expert for your selected solution is assigned to your account within 2 hours." },
  { step: "03", icon: "📞", title: "Discovery Call",
    desc: "Your expert reaches out at your preferred date and time to understand your needs in depth." },
  { step: "04", icon: "📄", title: "Proposal Delivered",
    desc: "A tailored solution proposal with pricing and timeline is delivered within 48 hours." },
];

const FAQS = [
  { q: "How long does implementation take?",
    a: "Most solutions go live in 5–14 business days depending on complexity and integration requirements." },
  { q: "Do you offer a free trial?",
    a: "Yes, we offer a 7-day free proof-of-concept for qualified enterprise leads." },
  { q: "Is my data secure?",
    a: "Absolutely. We are ISO 27001 certified and fully TRAI compliant. All data is encrypted at rest and in transit." },
  { q: "Can I integrate with my existing CRM?",
    a: "Yes — REST APIs and native integrations with Salesforce, Zoho, HubSpot, and more are available." },
];

const ContactConfirmation = ({ onScrollToForm }) => {
  return (
    <section className="cc-section">
      <div className="container">

        {/* Header */}
        <div className="cc-header">
          <h2 className="cc-header__title">What Happens Next?</h2>
          <p className="cc-header__subtitle">
            Our simple, transparent 4-step process from inquiry to deployment.
          </p>
        </div>

        {/* Process steps */}
        <div className="cc-steps">
          {STEPS.map((step, idx) => (
            <div key={step.step} className="cc-step">
              {idx < STEPS.length - 1 && <div className="cc-step__connector" aria-hidden="true" />}
              <div className="cc-step__num">{step.step}</div>
              <div className="cc-step__icon">{step.icon}</div>
              <h3 className="cc-step__title">{step.title}</h3>
              <p className="cc-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <hr className="gradient-divider" />

        {/* FAQs */}
        <div className="cc-faqs">
          <h3 className="cc-faqs__title">Frequently Asked Questions</h3>
          <div className="cc-faqs__grid">
            {FAQS.map((faq) => (
              <div key={faq.q} className="cc-faq-card">
                <h4 className="cc-faq-card__q">{faq.q}</h4>
                <p className="cc-faq-card__a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/*
         * ── UPDATED: Single "Contact Us" button only ──────────────────────
         * Removed: Call Now, WhatsApp Us, Email Us buttons as requested.
         * Replaced with one clear CTA that triggers the form.
         */}
        <div className="cc-cta-block">
          <h3>Still Have Questions?</h3>
          <p>Our team is ready to help you find the right solution for your business.</p>
          <button className="btn btn-primary cc-cta-btn" onClick={onScrollToForm}>
            Contact Us →
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactConfirmation;
