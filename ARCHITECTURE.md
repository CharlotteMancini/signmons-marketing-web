# Signmons Marketing – Frontend Partner Contract

## 1. Product Context: What Signmons Marketing Is

**Signmons Marketing** is the **public-facing marketing site** for the Signmons platform.

Its purpose is to:

- Educate trades businesses (HVAC, Plumbing, Electrical, Construction)
- Drive **lead capture** (consultation / start design / contact)
- Establish **brand authority**, trust, and professionalism
- Funnel users into **Signmons Core** (AI dispatcher, design intake, sales)

It is **not**:

- The CallDesk dispatcher UI
- The tenant admin dashboard
- A real-time SaaS application

This site is **content-first, conversion-driven**, and **SEO/GEO optimized**.

## 2. High-Level Architecture Rules

### Stack (Expected)

- **React + TypeScript**
- **Vite**
- **Material UI (MUI)** as the active UI system
- **Framer Motion** (animation only where intentional)
- **No backend business logic in the marketing app**
- **No Firebase auth**
- **No Stripe**
- **No embedded AI runtime logic**

### Architectural Goals

- Static or quasi-static rendering
- Fast load times (Core Web Vitals first)
- Modular sections
- Easy content updates
- Clear separation between:
  - Layout
  - Content
  - Animation
  - Data/config

## 3. Coding Standards (Mandatory)

### General

- **TypeScript only** (no `any`)
- Functional components only
- No business logic in JSX
- No inline styles except animation overrides
- No magic strings

### File & Folder Structure

```txt
src/
├─ components/
│  ├─ layout/
│  ├─ sections/
│  ├─ ui/
│  └─ motion/
├─ pages/
├─ data/
│  ├─ services.ts
│  ├─ navigation.ts
│  └─ marketingCopy.ts
├─ types/
├─ hooks/
├─ theme/
└─ utils/
```

### Naming

- Components: `PascalCase`
- Hooks: `useSomething`
- Data files: `camelCase.ts`
- Types: `SomethingType` or `SomethingDTO`

## 4. Data Contracts (Critical)

### Rule: No hardcoded marketing content inside components

All copy, services, CTAs, and navigation must come from **data contracts** in `src/data/*` with typed interfaces in `src/types/*`.

Components **render**, they do not **decide**.

## 5. Page-Level Responsibilities

### Home Page

- Hero (value prop + CTA)
- Services overview
- How it works
- Portfolio preview
- Trust signals
- Primary CTA

### Start Design / Contact

- Intake-focused
- No design tools
- Minimal friction
- Mobile-first

### About / Authority Pages

- Why Signmons
- Who it’s for
- Differentiators

## 6. UX / Conversion Rules

- One **primary CTA per section**
- CTAs must map to **real routes or explicit modal actions**
- No dead buttons
- No scroll-jacking
- Motion must never block readability
- Mobile is the default, desktop is enhancement

## 7. Animation Rules

- Framer Motion only
- Animations must be:
  - Purposeful
  - Subtle
  - Interruptible
- Disable heavy effects on mobile
- Never animate layout shifts that affect text legibility

## 8. SEO & GEO Standards

- Semantic HTML
- Proper heading hierarchy
- No skipped heading levels
- Metadata per page
- Trades-focused keywords
- Location-aware copy (future-ready)

## 9. What Refactoring Should Do (Explicit)

Refactoring **must**:

- Extract hardcoded content into `src/data`
- Reduce component size
- Improve reusability
- Enforce typing everywhere
- Remove duplicated layout logic
- Normalize CTA handling
- Improve accessibility

Refactoring **must not**:

- Change routes without reason
- Introduce new libraries casually
- Break visual hierarchy
- Mix marketing and SaaS concerns

## 10. Guardrails for the AI Partner

The AI partner:

- **May suggest improvements**
- **May refactor for clarity**
- **Must preserve intent**
- **Must ask before deleting**
- **Must not invent business rules**
- **Must not add backend assumptions**

If unsure, use:

> I will refactor this conservatively and preserve all behavior.

## 11. North Star

This site exists to answer one question clearly:

> **Why should a trades business trust Signmons with their brand and growth?**

Every line of code should support that answer.
