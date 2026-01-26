# Signmons Marketing — Task Board

Single source of truth for the marketing site workstream.

## Non‑negotiables
- Mobile‑first responsive design (320px → desktop)
- Modular structure (components, tokens, layout)
- SOLID principles for reusable UI logic
- OWASP best practices applied to all public‑facing code

---

## 1) Design System Alignment (MUI + Tokens)
- [x] Confirm tokens map 1:1 to MUI theme (palette, type, spacing, radius)
- [x] Ensure no raw hex values in components (tokens only)
- [x] Typography usage standardized (hero allowed to be raw h1 per spec)
- [x] Buttons use MUI primitives with token styling

SECTION 1 LOCK ✅

## 2) Hero Lock (Visual & Copy)
- [x] Hero headline + subhead finalized
- [x] Robot layer opacity / blend finalized
- [x] Starfield/galaxy background finalized
- [x] CTA placement finalized
- [x] Desktop + mobile line-height check

SECTION 2 LOCK ✅

## 3) Integrity Strip (Differentiators)
- [x] Build 4-card strip:
    - SMS-Only Canonical Confirmation
    - Payment-First Booking Gate
    - Fail-Closed Data Rules
    - Tenant Isolation by Design
- [x] Mobile stacking + spacing polish

SECTION 3 LOCK ✅

## 4) How It Works (Pipeline)
- [x] Pipeline flow: Voice → SMS → Payment → Job
- [x] Guardrail captions per step
- [x] Responsive layout & motion

SECTION 4 LOCK ✅

## 5) Trust / Safety / Compliance
- [x] Replace “Chat” section with Trust, Safety & Compliance
- [x] Add audit trail + isolation + fail-closed bullets
- [x] Add metrics (SLO highlights) from backend spec

SECTION 5 LOCK ✅

## 6) Conversion Scaffolding (No Backend)
- [x] Early Access modal (email only)
- [x] Demo CTA placeholder
- [x] Intent tracking hooks (no vendor)

SECTION 6 LOCK ✅

### Try‑Demo API Contract (MVP)
- Endpoint: `POST https://f2c1c2d7f64e.ngrok-free.app/api/marketing/try-demo`
- Required fields: phone (E.164), consentToAutoCall=true, consentTextVersion=try-demo-v1, demoScenario=hvac, callMode=immediate, timezone
- Optional: name, company, email, utm, referrerUrl
- Success UI: “Calling you now — please answer your phone.” + “Most demos connect in under 30 seconds.”

## 7) Mobile Polish Pass
- [x] Tap target sizes
- [x] Hero spacing on small screens
- [x] Particle performance check (low-power devices)

SECTION 7 LOCK ✅

## 8) Security & Quality (OWASP)
- [x] CSP / safe external assets list
- [x] No inline scripts
- [x] Sanitize any user inputs (modal/email)
- [x] Dependency audit check (npm audit)

### CSP (Baseline, Marketing)
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob:;
connect-src 'self' https://f2c1c2d7f64e.ngrok-free.app;
media-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
```

Dev additions (if needed):
- `connect-src` add `http://localhost:5173` `ws://localhost:5173`

### Audit
- `npm audit` clean (0 vulnerabilities).

SECTION 8 LOCK ✅

---

## Notes / Constraints
- CSS effects allowed only for: stars, glow, glass, motion layers.
- Keep brand visuals outside MUI.
- Ensure all interactive elements are keyboard accessible.
