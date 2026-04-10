/**
 * pages/TermsPage.js — Terms of Use
 */

import React from "react";
import "./LegalPage.css";

const TermsPage = () => {
  return (
    <div className="legal-page">
      <div className="container legal-page__inner">
        <div className="legal-page__header">
          <h1>Terms of Use</h1>
          <p className="legal-page__date">Last updated: April 1, 2026</p>
        </div>

        <div className="legal-page__body">
          <section>
            <p>
              ExpertServ Solutions and its affiliates (“ExpertServ”, “we”, “us”, or “our”) provide its website(s) and related platforms (collectively, the “Website/s”) subject to these Terms and Conditions of Use (“Terms”).

              By accessing or using the Website(s), you (“you” or “your”) agree to be bound by these Terms, our Privacy Policy, and other applicable policies. If you do not agree, you must not use the Website(s).

              These Terms do not apply to paid telecom services such as RCS, OTP SMS, Bulk SMS, APIs, or other communication services (“Services”), which are governed by separate agreements.
            </p>
          </section>

          <section>
            <h2>1. Changes to Terms</h2>
            <p>We may update these Terms at any time. Changes become effective immediately upon posting. Continued use of the Website constitutes acceptance of updated Terms.</p>
          </section>

          <section>
            <h2>2. Changes to Website</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Website at any time without notice.
            </p>
          </section>

          <section>
            <h2>3. Registration & Account</h2>
            <ul>
              <li>You may be required to register and create an account.</li>
              <li>You agree to provide accurate and updated information.</li>
              <li>You are responsible for maintaining confidentiality of your login credentials.</li>
              <li>Any activity under your account is your responsibility.</li>
              <li>Notify us immediately in case of unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2>4. User Content Guidelines</h2>
            <p>
              You agree that any content posted by you:
            </p>
            <ul>
              <li>Does not violate any law or intellectual property rights</li>
              <li>Is not harmful, abusive, misleading, or offensive</li>
              <li>Does not falsely represent endorsement by ExpertServ Solutions</li>
            </ul>
            <p>We reserve the right to remove or modify any content without notice.</p>
            <p>By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and distribute it.</p>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>All content on the Website including logos, designs, text, graphics, and software is owned or licensed by ExpertServ Solutions and protected under applicable laws.</p>
            <p>
              You may not copy, reproduce, or distribute any content without prior written permission.
            </p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <ul>
              <li>The Website is provided “as is” without warranties of any kind.</li>
              <li>We do not guarantee uninterrupted or error-free service.</li>
              <li>ExpertServ Solutions is not liable for any damages, data loss, or business interruption arising from use of the Website.</li>
            </ul>
            <p>
              Use of the Website is at your own risk.
            </p>
          </section>

          <section>
            <h2>7. Indemnification</h2>
            <p>
             You agree to indemnify and hold harmless ExpertServ Solutions, its employees, and partners from any claims, damages, or losses arising from your use of the Website or violation of these Terms.
            </p>
          </section>

          <section>
            <h2>8. Termination</h2>
            <p>
              We may suspend or terminate your access at any time without notice if you violate these Terms.
            </p>
          </section>

          <section>
            <h2>9. Governing Law</h2>
            <p>
             These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi, India.
            </p>
          </section>

          <section>
            <h2>10. Dispute Resolution</h2>
            <p>
              All disputes shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996. The arbitration shall take place in New Delhi, India, in English language.
            </p>
          </section>

          <section>
            <h2>11. Security & Virus Protection</h2>
            <p>While we take precautions, we do not guarantee that the Website is free from viruses or harmful components. Users are advised to use updated security software.</p>
          </section>

          <section>
            <h2>12. Assignment</h2>
            <p>ExpertServ Solutions may transfer its rights under these Terms without notice. Users may not assign their rights without prior written consent.</p>
          </section>

          <section>
            <h2>13. Miscellaneous</h2>
            <p>These Terms constitute the entire agreement between you and ExpertServ Solutions. If any part is found invalid, the remaining Terms remain enforceable.</p>
          </section>

          <section>
            <h2>14. Contact Us</h2>
            <p>For any questions regarding these Terms, contact us at:</p>
            <br/>
            E-Mail: <a href="supportexpertservsolutions.com">supportexpertservsolutions.com</a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
