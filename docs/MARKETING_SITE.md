# Signmons — Marketing Website & Pre-Auth Experience

## Core Rule
The marketing site does not sell features. It sells certainty, control, and outcomes.

If the SaaS app is the control plane, the marketing site is the trust plane.

## Site Architecture (Separate App)
Separate project/container (e.g., `signmons-marketing-web`).

Reasons:
- Different deployment cadence
- SEO + performance optimized
- No auth coupling
- Cleaner analytics
- Zero risk to core SaaS

Shared only:
- Design system
- Brand tokens
- Copy tone rules

## Primary Audiences (Marketing)
- Trades business owners (HVAC, plumbing, electrical)
- Dispatch/ops-minded owners
- Investors/partners
- Early adopters skeptical of AI

## Marketing Site Screens (Authoritative)
### 1) Home / Landing Page (Critical)
Goal: Immediate clarity — "This replaces chaos, not people."

Sections
- Hero
  - Headline: "The AI CSR that runs intake like your best dispatcher."
  - Subhead: "Bookings. Payments. Clean data. No guessing."
  - Primary CTA: See How It Works
  - Secondary CTA: Request Early Access
  - (Dancing robot + galaxy live here — subtle, not gimmicky.)
- What Signmons Is (3 pillars)
  - Answer Every Call
  - Confirm Every Detail
  - Get Paid Before Dispatch
  - Icon-driven, no paragraphs.
- How It Works (visual flow)
  - Customer calls or texts
  - AI CSR confirms name + address
  - Payment secured
  - Job created
  - Dispatcher sees confirmed data only
  - Animated or explainer video preferred.
- Why Owners Trust It
  - No guessing
  - No unpaid jobs
  - Full audit trail
  - Works with or without ServiceTitan
- CTA block
  - "See a real intake"
  - "Book a demo"
  - "Join the waitlist"

## URL & IA Lock (MVP)
For v1, this repo ships as a single-page marketing site at `/`.
Future routes listed below are aspirational and will be created only after v1 validation:
- /how-it-works
- /ai-csr
- /for-trades/hvac
- /for-trades/plumbing
- /trust
- /demo
- /pricing (optional)
- /about

## CTA Mechanics (MVP)
- Primary CTA: “Try Demo” → opens modal, posts to `/api/marketing/try-demo`.
- Secondary CTA: “Join Early Access” → email-only modal (no backend yet).

### 2) Product / How It Works Page
Goal: Explain how without exposing internals.

Sections
- The Problem
  - Missed calls
  - Bad addresses
  - Unpaid jobs
  - Dispatcher burnout
- The Signmons Difference
  - AI CSR ≠ chatbot
  - FSM-enforced confirmations
  - Payment-first booking
  - Visible trust indicators
- What Happens on a Call
  - Voice for reassurance
  - SMS for precision
  - Human fallback when needed

### 3) AI CSR Page (Category Definition)
Goal: Define a new category before competitors do.

Sections
- What Is an AI CSR?
  - Not a bot
  - Not a script
  - A trained intake professional, encoded
- What It Never Does
  - Guess
  - Skip confirmation
  - Hide uncertainty
  - Create unpaid jobs
- What It Always Does
  - Confirm
  - Lock data
  - Escalate safely
  - Protect your brand

### 4) For Trades (HVAC / Plumbing / Electrical)
Goal: Vertical resonance.

Sections
- Emergency framing
- After-hours calls
- Cold weather urgency
- Tech protection (no bad calls)

Each trade gets:
- 3 bullet outcomes
- 1 short scenario
- 1 CTA

### 5) Trust, Safety & Compliance (Critical)
Goal: Kill AI skepticism.

Sections
- Explicit confirmations
- Fail-closed rules
- Audit trails
- Consent enforcement
- Human override always available

This page closes deals.

### 6) Pricing (Optional / Soft)
Goal: Frame value, not nickel-and-dime.

Sections
- Per-call or per-booking framing
- "No booking, no charge" language
- Transparent provider costs (high-level)
- CTA: Talk to Us

### 7) Demo / Explainer Experience (High Value)
Goal: Let them experience correctness.

Options
- Interactive chat demo
- Recorded voice intake
- Animated FSM walkthrough

This replaces long sales calls.

### 8) About / Vision (Investor-Safe)
Goal: Signal seriousness.

Sections
- Why Signmons exists
- Why AI must be constrained
- Why trades deserve better software
- No hype language

### 9) Conversion Utilities
Screens/components
- Waitlist form
- Demo request
- Contact
- Early-access CTA
- Newsletter (optional)

## UX / UI Rules (Marketing)
- ADA contrast
- Large typography
- Minimal copy
- Motion with restraint
- Confidence, not hype
- No dark patterns
- No fake testimonials

## UX / UI Non-Negotiables (Award-Grade)
- High contrast (ADA)
- Large tap targets
- Minimal text blocks
- Progressive disclosure
- Confirmed badges (green)
- Candidate badges (yellow)
- Never auto-advance without confirmation
- Never hide uncertainty

## Analytics (Non-Negotiable)
- Page intent tracking
- CTA conversion
- Demo interest
- Vertical interest
- Drop-off points
- No invasive tracking
