# ExpertServ Solution — Full-Stack MERN Telecom Web App

> Enterprise IVR, RCS, SMS & OTP platform with lead management, admin dashboard, dark/light theme, and automated notifications.

---

## 📁 Project Structure

```
expertserv/
├── backend/                        # Node.js + Express API
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Admin login / JWT
│   │   ├── contactController.js    # Contact form handler
│   │   └── adminController.js      # Leads CRUD + CSV export
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT protect middleware
│   ├── models/
│   │   ├── Lead.js                 # Contact form submission schema
│   │   └── Admin.js                # Admin user schema
│   ├── routes/
│   │   ├── auth.js                 # POST /api/auth/login
│   │   ├── contact.js              # POST /api/contact/submit
│   │   └── admin.js                # Protected admin routes
│   ├── utils/
│   │   ├── emailService.js         # Nodemailer email notifications
│   │   └── whatsappService.js      # Twilio WhatsApp notifications
│   ├── .env.example                # Environment variable template
│   ├── package.json
│   └── server.js                   # Express app entry point
│
└── frontend/                       # React App
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar/             # Sticky nav, mobile menu, theme toggle
        │   ├── Footer/             # Full footer with all sections
        │   ├── Contact/
        │   │   ├── ContactHero.js  # Page 1: Animated hero
        │   │   ├── ContactForm.js  # Page 2: Full form + reCAPTCHA
        │   │   └── ContactConfirmation.js  # Page 3: Next steps + FAQs
        │   └── Admin/
        │       ├── AdminLogin.js   # JWT login form
        │       └── AdminDashboard.js  # Leads table, filters, export
        ├── context/
        │   └── ThemeContext.js     # Dark/light theme (persisted to localStorage)
        ├── pages/
        │   ├── HomePage.js         # Landing page (Products, Industries, etc.)
        │   ├── ContactPage.js      # Assembles 3 contact sections
        │   ├── AdminLoginPage.js
        │   ├── AdminDashboardPage.js
        │   ├── PrivacyPolicyPage.js
        │   ├── TermsPage.js
        │   └── NotFoundPage.js
        ├── styles/
        │   └── globals.css         # CSS variables, theme, base styles
        ├── App.js                  # Router + providers
        └── index.js                # React entry point
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account (for Nodemailer)
- Twilio account (for WhatsApp notifications)
- Google reCAPTCHA v2 keys

---

### Step 1 — Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd expertserv

# Install all dependencies (root + backend + frontend)
npm run install:all
```

---

### Step 2 — Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in:

| Variable | Where to Get It |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers |
| `JWT_SECRET` | Run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `EMAIL_USER` / `EMAIL_PASS` | Gmail → Security → 2FA → App Passwords → Generate |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | [Twilio Console](https://console.twilio.com) |
| `TWILIO_WHATSAPP_FROM` | Twilio Sandbox: `whatsapp:+14155238886` |
| `TWILIO_WHATSAPP_TO` | Your WhatsApp number: `whatsapp:+91XXXXXXXXXX` |
| `RECAPTCHA_SECRET_KEY` | [reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create) |

---

### Step 3 — Configure Frontend Environment

```bash
cd frontend
cp .env.example .env
```

Fill in:
```
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 4 — Create Admin Account

Start the backend, then run this **one-time** setup call:

```bash
# Start backend first
cd backend && npm run dev

# In a new terminal, create the admin account:
curl -X POST http://localhost:5000/api/auth/setup
```

This creates admin credentials from your `.env` values (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).

> ⚠️ **Disable the `/api/auth/setup` route in production** after setup by removing it from `backend/routes/auth.js`.

---

### Step 5 — Run the App

```bash
# From the root directory — runs both backend and frontend together
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| API Health Check | http://localhost:5000/api/health |

---

## 🔌 API Endpoints

### Public
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact/submit` | Submit contact form |
| `POST` | `/api/auth/login` | Admin login |
| `POST` | `/api/auth/setup` | One-time admin creation *(disable in prod)* |

### Protected (requires `Authorization: Bearer <token>`)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/admin/leads` | Get leads (filterable, paginated) |
| `GET` | `/api/admin/leads/export` | Export filtered leads as CSV |
| `DELETE` | `/api/admin/leads/:id` | Delete a lead |
| `GET` | `/api/admin/stats` | Dashboard statistics |

#### Filter Parameters for GET /api/admin/leads
```
?startDate=2025-01-01&endDate=2025-12-31&solution=IVR&state=Delhi&page=1&limit=20
```

---

## 🎨 Features Overview

### Frontend
| Feature | Implementation |
|---|---|
| Dark/Light Theme | `ThemeContext.js` — saved to `localStorage`, smooth CSS transitions |
| Responsive Design | Mobile-first CSS, hamburger menu |
| Form Validation | Client-side (JS) + server-side (Express) |
| reCAPTCHA | `react-google-recaptcha` v2 — verified server-side |
| Date Picker | `react-datepicker` — weekends disabled, min = today |
| Toast Notifications | `react-hot-toast` |

### Backend
| Feature | Implementation |
|---|---|
| Auth | JWT (`jsonwebtoken`) + bcrypt password hashing |
| Email Alerts | Nodemailer — HTML email on new lead |
| WhatsApp Alerts | Twilio API — formatted message on new lead |
| reCAPTCHA Verify | Google `siteverify` API endpoint |
| CSV Export | `json2csv` library |
| Data Validation | Mongoose schema + controller-level checks |

---

## 🛡️ Security Notes

- **Never commit `.env` files** — they're in `.gitignore`
- JWT tokens expire after 24 hours by default
- Passwords are bcrypt hashed (cost factor 12)
- CORS is restricted to `FRONTEND_URL` from `.env`
- reCAPTCHA verified server-side (not just client-side)
- MongoDB connection uses Atlas with IP allowlisting

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, CSS Variables |
| Styling | Custom CSS (no UI library) — Syne + DM Sans fonts |
| HTTP Client | Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| WhatsApp | Twilio API |
| CAPTCHA | Google reCAPTCHA v2 |
| CSV Export | json2csv |
| Dev Tools | nodemon, concurrently |

---

## 🚢 Production Deployment

```bash
# Build React frontend
npm run build:frontend

# The build/ folder can be served by:
# - Vercel / Netlify (frontend)
# - Railway / Render / DigitalOcean (backend)
# - Or serve statically from Express:

# In backend/server.js, add after routes:
# app.use(express.static(path.join(__dirname, '../frontend/build')));
# app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));
```

> Remember to set all environment variables in your hosting provider's dashboard, not in `.env` files.

---

## 📞 Support

For questions about this codebase, contact the development team or open an issue in the repository.
