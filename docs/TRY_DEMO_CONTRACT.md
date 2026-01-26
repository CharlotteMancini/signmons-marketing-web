# Try Demo API Contract (Marketing)

This document defines the **marketing demo call contract** used by the Signmons marketing site.

This endpoint is **marketing-only** and is **not part of the SaaS runtime**.
It exists solely to trigger a live AI demo call.

---

## Endpoint

POST `/api/marketing/try-demo`

Example (production / tunnel):

```
POST https://<host>/api/marketing/try-demo
```

---

## Headers

| Header | Required | Notes |
|------|--------|------|
| Content-Type | ✅ | `application/json` |
| X-Request-Id | ❌ | Optional idempotency key |
| X-Captcha-Token | ❌ | Optional (future abuse protection) |

---

## Request Body (JSON)

```json
{
  "phone": "+12165551234",
  "consentToAutoCall": true,
  "consentTextVersion": "try-demo-v1",
  "demoScenario": "hvac",
  "callMode": "immediate",
  "timezone": "America/New_York",
  "name": "Ben",
  "company": "Leizurely HVAC",
  "email": "ben@leizurely.com",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "try-demo"
  },
  "referrerUrl": "https://signmons.com"
}
```

### Required Fields

| Field | Type | Notes |
|---|---|---|
| phone | string | E.164 format |
| consentToAutoCall | boolean | Must be true |
| consentTextVersion | string | e.g. `try-demo-v1` |
| demoScenario | string | `hvac` &#124; `plumbing` &#124; `electrical` |
| callMode | string | `immediate` |
| timezone | string | IANA timezone |

### Optional Fields

- name
- company
- email
- utm
- referrerUrl

---

## Response (202 Accepted)

```json
{
  "status": "queued",
  "leadId": "lead_abc123",
  "call": {
    "status": "initiated",
    "to": "+12165551234",
    "from": "+12167448929",
    "callSid": "CAxxxxxxxx"
  },
  "estimatedWaitSec": 20
}
```

---

## Notes

- The request is asynchronous.
- A `202 Accepted` indicates the call has been queued.
- Voice execution happens out-of-band.
- No redirect or polling is required by the frontend.

---

## Non-Goals

- This endpoint does **not** create accounts.
- This endpoint does **not** authenticate users.
- This endpoint does **not** expose SaaS data.
