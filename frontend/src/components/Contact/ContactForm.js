/**
 * ContactForm.js — Enhanced Contact Form (Page 2)
 * Updated: Animated glow borders, Roboto font, modern inputs,
 * glowing submit button, improved UX transitions.
 * No "Call Now" options anywhere.
 */
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./ContactForm.css";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli",
  "Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const SOLUTIONS = [
  { value: "IVR", label: "IVR — Interactive Voice Response" },
  { value: "RCS", label: "RCS — Rich Communication Services" },
  { value: "SMS", label: "SMS — Bulk SMS Messaging"          },
  { value: "OTP", label: "OTP — One-Time Password"           },
];

const TIME_SLOTS = [
  "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM",
  "03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM",
];

const INITIAL = {
  name:"", email:"", phone:"", companyName:"",
  state:"", solution:"", preferredDate: null,
  preferredTime:"", agreedToPolicy: false,
};

const ContactForm = () => {
  const [form,           setForm]           = useState(INITIAL);
  const [errors,         setErrors]         = useState({});
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [isSuccess,      setIsSuccess]      = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const handleDateChange = (date) => {
    setForm(p => ({ ...p, preferredDate: date }));
    if (errors.preferredDate) setErrors(p => ({ ...p, preferredDate: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)     e.name          = "Full name is required (min 2 chars)";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))   e.email         = "Enter a valid email address";
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone))     e.phone         = "Valid 10-digit mobile number required";
    if (!form.companyName.trim())                              e.companyName   = "Company name is required";
    if (!form.state)                                           e.state         = "Please select your state";
    if (!form.solution)                                        e.solution      = "Please select a solution";
    if (!form.preferredDate)                                   e.preferredDate = "Please select a preferred date";
    if (!form.preferredTime)                                   e.preferredTime = "Please select a time slot";
    if (!form.agreedToPolicy)                                  e.agreedToPolicy= "You must agree to the Privacy Policy";
    if (!recaptchaToken)                                       e.recaptcha     = "Please complete the reCAPTCHA";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      document.querySelector(".form-input.error, .error-highlight")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "/api";

const { data } = await axios.post(
  `${API_URL}/contact/submit`,
  {
    ...form,
    preferredDate: form.preferredDate?.toISOString(),
    recaptchaToken
  }
);

      if (data.success) {
        setIsSuccess(true);
        toast.success("Your inquiry has been submitted!");
        setForm(INITIAL);
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) setErrors(serverErrors);
      toast.error(error.response?.data?.message || "Submission failed. Please try again.");
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form__success">
            <div className="success-icon">✅</div>
            <h2>Thank You!</h2>
            <p>
              Your inquiry has been received. Our team will reach out within
              24 business hours at <strong>{form.email}</strong>.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)}>
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="container">
        <div className="contact-form__header">
          <h2 className="contact-form__title">Schedule a Consultation</h2>
          <p className="contact-form__subtitle">
            Fill in your details and our team will reach out within 24 hours.
          </p>
        </div>

        <div className="contact-form__wrapper">
          {/* Info Panel */}
          <aside className="contact-form__info">
            <h3>Why Choose ExpertServ?</h3>
            <ul className="info-benefits">
              {[
                { icon: "⚡", text: "Response within 2 business hours"          },
                { icon: "🎯", text: "Custom solution design for your industry"   },
                { icon: "🔒", text: "100% data privacy — ISO 27001 certified"    },
                { icon: "💡", text: "Free proof-of-concept for qualified leads"  },
                { icon: "🌐", text: "24/7 expert support post-deployment"        },
              ].map(b => (
                <li key={b.text}>
                  <span className="benefit-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
            <div className="info-contact-details">
              <div className="info-contact-item">
                <span>📧</span>
                <a href="mailto:supportexpertservsolutions@gmail.com">supportexpertservsolutions@gmail.com</a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input id="name" name="name" type="text"
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="John Doe" value={form.name}
                  onChange={handleChange} autoComplete="name" />
                {errors.name && <span className="form-error">⚠ {errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="john@company.com" value={form.email}
                  onChange={handleChange} autoComplete="email" />
                {errors.email && <span className="form-error">⚠ {errors.email}</span>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number * (10 digits)</label>
                <input id="phone" name="phone" type="tel"
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="98XXXXXXXX" value={form.phone}
                  onChange={handleChange} maxLength={10} autoComplete="tel" />
                {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="companyName">Company Name *</label>
                <input id="companyName" name="companyName" type="text"
                  className={`form-input ${errors.companyName ? "error" : ""}`}
                  placeholder="Acme Corp Pvt. Ltd." value={form.companyName}
                  onChange={handleChange} />
                {errors.companyName && <span className="form-error">⚠ {errors.companyName}</span>}
              </div>
            </div>

            {/* Row 3 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="state">State *</label>
                <select id="state" name="state"
                  className={`form-input form-select ${errors.state ? "error" : ""}`}
                  value={form.state} onChange={handleChange}>
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <span className="form-error">⚠ {errors.state}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="solution">Select Solution *</label>
                <select id="solution" name="solution"
                  className={`form-input form-select ${errors.solution ? "error" : ""}`}
                  value={form.solution} onChange={handleChange}>
                  <option value="">Choose a solution</option>
                  {SOLUTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                {errors.solution && <span className="form-error">⚠ {errors.solution}</span>}
              </div>
            </div>

            {/* Row 4 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Preferred Date *</label>
                <DatePicker selected={form.preferredDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  className={`form-input ${errors.preferredDate ? "error" : ""}`}
                  wrapperClassName="datepicker-wrapper"
                  filterDate={d => d.getDay() !== 0 && d.getDay() !== 6} />
                {errors.preferredDate && <span className="form-error">⚠ {errors.preferredDate}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="preferredTime">Preferred Time *</label>
                <select id="preferredTime" name="preferredTime"
                  className={`form-input form-select ${errors.preferredTime ? "error" : ""}`}
                  value={form.preferredTime} onChange={handleChange}>
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.preferredTime && <span className="form-error">⚠ {errors.preferredTime}</span>}
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="form-group">
              {/*
               * 👇 Set REACT_APP_RECAPTCHA_SITE_KEY in frontend/.env
               * Get key at: https://www.google.com/recaptcha/admin/create
               * Choose: reCAPTCHA v2 → "I'm not a robot"
               */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                onChange={token => { setRecaptchaToken(token); if (errors.recaptcha) setErrors(p => ({ ...p, recaptcha: "" })); }}
                onExpired={() => setRecaptchaToken(null)}
              />
              {errors.recaptcha && <span className="form-error">⚠ {errors.recaptcha}</span>}
            </div>

            {/* Policy checkbox */}
            <div className={`form-group form-checkbox-group ${errors.agreedToPolicy ? "error-highlight" : ""}`}>
              <label className="form-checkbox-label">
                <input type="checkbox" name="agreedToPolicy"
                  checked={form.agreedToPolicy} onChange={handleChange}
                  className="form-checkbox" />
                <span>
                  I agree to the{" "}
                  <Link to="/privacy-policy" target="_blank" className="form-policy-link">Privacy Policy</Link>
                  {" "}&amp;{" "}
                  <Link to="/terms-of-use" target="_blank" className="form-policy-link">Terms of Use</Link>
                </span>
              </label>
              {errors.agreedToPolicy && <span className="form-error">⚠ {errors.agreedToPolicy}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary contact-form__submit" disabled={isSubmitting}>
              {isSubmitting ? <><span className="spinner" /> Submitting...</> : "Submit Inquiry →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
