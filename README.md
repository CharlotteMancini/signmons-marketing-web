# Signmons Marketing

Marketing site for **Signmons** — an AI dispatcher for the trades.

This repository contains a **static marketing experience** and a **live demo trigger**, not the SaaS application.

---

## What This Repo Is

- Public-facing marketing site
- Live AI demo call trigger ("Try Demo")
- Early Access interest capture

---

## What This Repo Is Not

- Not the SaaS runtime
- No authentication
- No user accounts
- No analytics vendors
- No product data access

---

## Tech Stack

- Vite + React
- MUI with shared design tokens
- Framer Motion (subtle motion only)
- Netlify hosting

---

## Key Documentation

- `docs/MARKETING_PREFLIGHT.md` — guardrails & constraints
- `docs/MARKETING_SITE.md` — IA, routing, CTA mechanics
- `docs/TRY_DEMO_CONTRACT.md` — demo call API
- `docs/SECURITY.md` — security posture
- `docs/TASKS.md` — execution record

---

## Demo Behavior

**Try Demo**
- Triggers an outbound AI call
- No redirect
- Marketing-only endpoint

**Early Access**
- Email-only
- No backend dependency yet

---

## Deployment

- Static hosting
- CSP (Report-Only → Enforced)
- No runtime secrets in repo

---

## License / Usage

Internal use unless otherwise specified.
