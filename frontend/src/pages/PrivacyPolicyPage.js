/**
 * pages/PrivacyPolicyPage.js — Privacy Policy
 * ----------------------------------------------
 * Full privacy policy page linked from the footer and contact form.
 */

import React from "react";
import "./LegalPage.css";

const PrivacyPolicyPage = () => {
  return (
    <div className="legal-page">
      <div className="container legal-page__inner">
        <div className="legal-page__header">
          <h1>Privacy Policy</h1>
          <p className="legal-page__date">Last updated: April 1, 2026</p>
        </div>

        <div className="legal-page__body">
          <section>
            {/* <h2>1. Information We Collect</h2> */}
            <p>
              This Privacy Policy applies to ExpertServ Solutions and all its subsidiaries and/or branch offices in India. It outlines the practices and policies adopted by ExpertServ Solutions (including its employees, interns, contractors, consultants, clients, customers, or any other party directly or indirectly engaged for business or otherwise) for handling Personal Information, including Sensitive Personal Data or Information, that is lawfully collected by ExpertServ Solutions.

             ExpertServ Solutions may collect personal data of its employees, potential employees, clients, suppliers, business contacts, shareholders, website users, or any other individuals or entities as required for business purposes.
             
             ExpertServ Solutions places great importance on your privacy and the protection of your data. We are committed to ensuring that your personal information remains secure when you interact with us.
             
             We protect your personal data in accordance with applicable laws and internal data privacy policies. Additionally, we implement appropriate technical and organizational measures to safeguard your data against unauthorized access, disclosure, alteration, or destruction.
             </p>
          </section>

          <section>
            <h2>1. General Definitions</h2>
            {/* <p>We use the information you provide to:</p> */}
            <ul>
              <li>You” or “Your” refers to any individual who provides personal data to ExpertServ Solutions.</li>
              <li>“Act” refers to the Information Technology Act, 2000 and its amendments.</li>
              <li>“Information” includes Personal Information and Sensitive Personal Data.
              “Personal Information (PI)” refers to any data that can identify an individual, as defined under applicable rules.</li>
              <li>“Sensitive Personal Data or Information (SPDI)” includes financial data, passwords, health data, and other sensitive information as defined under the law.</li>
              <li>“Registered User” refers to users who have successfully registered with ExpertServ Solutions.</li>
            </ul>
          </section>

          <section>
            <h2>2. Commitment to Privacy</h2>
            <p>ExpertServ Solutions is fully committed to protecting your personal information. This policy explains:</p>
            <ul>
              <li>What data we collect</li>
              <li>How we collect it</li>
              <li>How we use it</li>
              <li>How long we retain it</li>
              <li>With whom it may be shared</li>
            </ul>
            <p>This Privacy Policy is published in compliance with applicable legal requirements.</p>
          </section>

          <section>
            <h2>3. Collection and Use of Information</h2>
            <p>
              We collect various types of information to provide and improve our telecom services such as RCS, OTP SMS, Bulk SMS, and communication APIs.
            </p>
            <h4>1. Information You Provide</h4>
            <ul>
              <li>Account Information: Name, email, phone number, billing details</li>
              <li>Contact Data: Phone numbers and details uploaded for messaging services</li>
            </ul>
            <h4>2. Information Collected Automatically</h4>
            <ul>
              <li>Log Data: Access time, delivery reports, system logs</li>
            </ul>
            <h4>How We Use Your Information</h4>
            <p>We use your data to:</p>
            <ul>
              <li>Provide telecom services</li>
              <li>Process transactions</li>
              <li>Communicate updates and support</li>
              <li>Send marketing communications (with consent)</li>
              <li>Improve performance and security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact our Data
              Protection Officer at:
            </p>
            <p>
              <strong>ExpertServ Solutions</strong><br />
              Dharma Cloth Market, Atta, Sector - 27 3rd Floor, Noida — 201301, India<br />
              Email: <a href="supportexpertservsolutions.com">supportexpertservsolutions.com</a><br />
              Phone: +91 9643810276
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
