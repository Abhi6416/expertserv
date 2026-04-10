/**
 * pages/ContactPage.js — Contact Us (3 Sections)
 * Page 1: ContactHero   — Animated hero
 * Page 2: ContactForm   — Full form with reCAPTCHA
 * Page 3: ContactConfirmation — Next steps + FAQs + single CTA
 */

import React, { useRef, Suspense } from "react";
import ContactHero from "../components/Contact/ContactHero";
import ContactForm from "../components/Contact/ContactForm";
import ContactConfirmation from "../components/Contact/ContactConfirmation";

const ContactPage = () => {
  const formRef = useRef(null);

  /* Scroll to form when hero CTA or confirmation CTA is clicked */
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <ContactHero onScrollToForm={scrollToForm} />
      <div ref={formRef}>
        <ContactForm />
      </div>
      {/* Pass scrollToForm so the "Contact Us" button in confirmation works */}
      <ContactConfirmation onScrollToForm={scrollToForm} />
    </>
  );
};

export default ContactPage;
