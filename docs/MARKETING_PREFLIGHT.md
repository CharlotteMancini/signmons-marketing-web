# Marketing Website Pre-Flight Checklist (Authoritative)

## 1) Isolation Rules (Non-Negotiable)
Do not colocate with the SaaS frontend.

Do not share runtime auth, API clients, or env vars.

Allowed to share only:
- Design tokens (colors, typography, spacing)
- Brand assets (logo, motion assets)
- Copy tone rules

Explicitly forbidden:
- Firebase Auth
- SaaS API endpoints
- Feature flags
- Internal routes

This guarantees:
- Zero blast radius
- Independent deploy cadence
- Investor/demo safety

## 2) Decide the Marketing Stack (Lock It Now)
Recommended (aligned with principles):
- Framework: Vite + React
- Rendering: Static / CSR only
- Styling: MUI (shared tokens only)
- Hosting: Static hosting (Vercel, Netlify, or Firebase Hosting)
- Analytics: Lightweight (no session replay, no heatmaps initially)

Explicitly avoid:
- Next.js app router complexity
- Auth-aware routing
- Server components
- Feature flags
- Anything that smells like “product UI”

If you want, I can provide a one-command scaffold that mirrors SaaS conventions without coupling.

## 3) Design System Extraction (Do This Before Pages)
Create a minimal shared design package (local is fine at first).

Lock these first:
- Color tokens (confirmed green, candidate yellow, neutral darks)
- Typography scale (hero, section, body, caption)
- Motion rules (durations, easing)
- Badge semantics (Confirmed / Candidate / Disabled)

This prevents:
- Re-litigating visual decisions per page
- Marketing drifting from product truth
- Inconsistent trust signals

Do not build components yet — tokens first.

## 4) URL & IA Lock (Prevents SEO Churn)
Before coding, lock the top-level routes exactly as written in `docs/MARKETING_SITE.md`.

Example:
```
/
/how-it-works
/ai-csr
/for-trades/hvac
/for-trades/plumbing
/trust
/demo
/pricing (optional)
/about
```

Rules:
- No `/app`
- No `/dashboard`
- No auth redirects
- Human-readable URLs only

Changing URLs later costs trust and SEO.

MVP clarification:
- Single-page marketing experience is acceptable for v1 if documented in `MARKETING_SITE.md`.

## 5) CTA Contract (Extremely Important)
Decide now what CTAs do technically.

For MVP marketing:
- “Request Early Access” → form submit (no auth)
- “Book a Demo” → calendar or form
- “See How It Works” → internal page, not SaaS

Explicitly not allowed:
- Auto-creating accounts
- Silent redirects to SaaS
- “Try it now” unless it is a demo sandbox

Marketing must never surprise users.

MVP CTA contract (locked):
- “Try Demo” → opens demo-call modal and posts to `/api/marketing/try-demo` (marketing-only endpoint).
- “Join Early Access” → email-only modal (no backend required yet).

## 6) Analytics Guardrails (Before You Add Any)
Define this upfront.

Allowed:
- Page view
- CTA click
- Demo request
- Vertical interest

Not allowed:
- Session replay
- Scroll spying
- Keystroke capture
- Identity correlation

Document this once and enforce it.

MVP implementation note:
- Only console intent logs (no vendors, no cookies, no storage).

## 7) Final Sanity Check (Green Light Criteria)
You are ready to build when:
- Repo is separate
- Stack is locked
- Tokens are defined
- Routes are fixed
- CTAs are scoped
- Analytics rules are written

Only then should you scaffold.

## Recommendation: Next Step
Extract and lock the marketing design tokens (colors, typography, badge semantics).

After that, the Home/Landing page becomes trivial and fast.
