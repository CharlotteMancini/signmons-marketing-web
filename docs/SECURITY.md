# Security & Quality Posture (Marketing Site)

This document outlines the security posture for the Signmons marketing site.

This repo is intentionally **static and isolated** from the SaaS runtime.

---

## Scope

Applies to:
- Marketing site UI
- Demo trigger flow
- Early Access capture

Does **not** apply to:
- SaaS runtime
- Authenticated user flows
- Internal operational tooling

---

## Content Security Policy (CSP)

- CSP is deployed in **Report-Only** mode initially.
- Policy is promoted to enforced once verified clean.
- No inline scripts permitted.
- External assets are explicitly allow-listed.

---

## Script Safety

- No `dangerouslySetInnerHTML`
- No inline `<script>` tags
- No `eval` or dynamic code execution

---

## Input Handling

All user inputs are:
- Normalized client-side
- Never rendered as HTML
- Never interpolated into DOM attributes
- Sent only to explicitly scoped marketing endpoints

---

## Analytics & Tracking

- No third-party analytics vendors
- No cookies
- No localStorage / sessionStorage
- Intent captured via:
  - `data-*` attributes
  - `console.info()` only

---

## Dependency Hygiene

- Regular `npm audit`
- High / critical vulnerabilities addressed before release
- Dev-only dependencies documented if retained

---

## OWASP Alignment

The marketing site aligns with OWASP Top 10 principles:
- Injection-safe
- XSS-resistant
- Strict CSP
- No auth surface
- Minimal attack area

---

## Principle of Least Privilege

- Marketing repo has no access to SaaS data
- Demo endpoint is marketing-only
- No shared secrets or runtime credentials
