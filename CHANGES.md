# ExpertServ Solution — v2.0 Changes Summary

## Frontend Changes

### Typography
- ✅ Replaced Syne + DM Sans with **Roboto** across entire app (all weights: 300–900)
- ✅ Consistent font-weight usage in headings, labels, and body text

### Navbar
- ✅ Added **Home** nav link
- ✅ Removed **Careers** nav link
- ✅ Logo image support added (see `src/assets/README_LOGO.md` for instructions)
- ✅ Active page indicator (underline on current route)
- ✅ Glassmorphism backdrop blur effect on scroll

### Layout
- ✅ Container widened to 1280px with larger padding (48px sides)
- ✅ Full-width sections that use screen space left & right
- ✅ Homepage redesigned with left/right split layouts
- ✅ Industries section: sticky left header + right grid
- ✅ About section: visual card left + text right

### Visual Design & Animations
- ✅ Blue-themed gradient system (`--gradient-primary`, `--gradient-hero`)
- ✅ Glassmorphism cards and nav on scroll
- ✅ Hover: `translateY` lift + shadow glow on all cards
- ✅ Scroll reveal animations (IntersectionObserver) on all sections
- ✅ Shimmer button hover effect
- ✅ Animated gradient border on contact form (on focus-within)
- ✅ Glowing submit button animation
- ✅ Stats band with gradient background
- ✅ Product cards with colored icon backgrounds + glow on hover

### Footer
- ✅ Font sizes increased (14–20px range)
- ✅ Full-width grid with 5 columns (brand + contact + links + products + industries)
- ✅ Gradient top border with animation
- ✅ Column title underline accent bar
- ✅ Arrow-reveal effect on footer links
- ✅ Animated social icons
- ✅ Logo image support

### Contact Page
- ✅ Removed "Need to reach us directly" (Call/WhatsApp/Email buttons)
- ✅ Single "Contact Us" button CTA replaces all alternate contact options
- ✅ All "Call Now" options removed from entire website
- ✅ Animated gradient border on form card (glows on input focus)
- ✅ Input glow animation on focus (translateY + box-shadow)

### Performance & SEO
- ✅ **Lazy loading** for all pages (React.lazy + Suspense)
- ✅ **Code splitting** — each page loads as a separate chunk
- ✅ Full SEO meta tags (description, keywords, og:, twitter:)
- ✅ JSON-LD structured data (Organization schema)
- ✅ Canonical URL meta tag
- ✅ Semantic HTML (`<section>`, `<article>`, `<aside>`, `aria-label`)
- ✅ IntersectionObserver scroll animations (no layout jank)
- ✅ Preconnect hints for Google Fonts

## Backend Changes

### Contact Form
- ✅ **WhatsApp (Twilio) notifications removed** entirely
- ✅ Only email notification (Nodemailer) remains
- ✅ `whatsappSent` field removed from Lead model
- ✅ `whatsappService.js` kept but commented out (for future re-enable)
- ✅ Cleaner, leaner contactController

## How to Start

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm start
```

## Logo Integration
See: `frontend/src/assets/README_LOGO.md`
