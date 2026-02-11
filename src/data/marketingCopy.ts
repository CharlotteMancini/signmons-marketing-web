import { marketingCtas } from './navigation';
import type {
  EarlyAccessModalContract,
  HomePageCopy,
  SeoPageMeta,
  TryDemoModalContract,
} from '../types/marketing';

export const brandName = 'Signmons';

export const seoByPage: SeoPageMeta[] = [
  {
    route: '/',
    title: 'Signmons Marketing | AI CSR for Trades',
    description:
      'Signmons helps trades businesses answer calls, qualify jobs, secure payment, and protect dispatch quality.',
    keywords: [
      'AI dispatcher',
      'trades marketing',
      'HVAC lead capture',
      'plumbing call intake',
      'electrical service booking',
      'payment-first dispatch',
    ],
  },
];

export const homePageCopy: HomePageCopy = {
  hero: {
    title: 'Get Paid Before You Ever Send a Truck.',
    lead: 'Call, text, or chat—Signmons AI handles the intake and collects the deposit on the spot.',
    capabilities: [
      {
        id: 'call-answering',
        lineOne: '24/7 Call',
        lineTwo: 'Answering',
        iconKey: 'call',
      },
      {
        id: 'qualified-jobs',
        lineOne: 'Qualified',
        lineTwo: 'Jobs',
        iconKey: 'jobs',
      },
      {
        id: 'schedules-appts',
        lineOne: 'Schedules',
        lineTwo: 'Appts',
        iconKey: 'schedule',
      },
      {
        id: 'paid-upfront',
        lineOne: 'Get Paid',
        lineTwo: 'Upfront',
        iconKey: 'payment',
      },
      {
        id: 'instant-updates',
        lineOne: 'Instant',
        lineTwo: 'Updates',
        iconKey: 'updates',
      },
      {
        id: 'revenue-insights',
        lineOne: 'Revenue',
        lineTwo: 'Insights',
        iconKey: 'insights',
      },
    ],
    primaryCta: marketingCtas.heroPrimary,
    trustText: 'Trusted by HVAC, Plumbing',
    trustTextBreak: 'Electrical & Construction',
  },
  integrity: {
    videos: [
      {
        id: 'local-demo',
        title: 'NO LOST CALLS = MORE MONEY!',
        src: '/media/signmons-demo-local.mp4',
        poster: '/media/signmons-demo-local-poster-v3.png',
        ariaLabel: 'Play Signmons local demo video',
      },
      {
        id: 'vimeo-demo',
        title: 'LET AI WORK FOR YOU!',
        src: '/media/signmons-demo-vimeo.mp4',
        poster: '/media/signmons-demo-vimeo-poster.png',
        ariaLabel: 'Play Signmons promo demo video',
      },
    ],
    cards: [
      {
        id: 'paid-before-dispatch',
        title: 'Paid Before Dispatch',
        description: 'Jobs start only after payment approval.',
        tone: 'payment',
      },
      {
        id: 'isolated-customer-data',
        title: 'Isolated Customer Data',
        description: 'No shared data between accounts.',
        tone: 'tenant',
      },
    ],
  },
  howItWorks: {
    sectionId: 'how-it-works',
    title: 'How Signmons Protects Your Revenue',
    lead: 'Every inquiry is captured, qualified, and converted into paid, dispatch-ready work.',
    steps: [
      {
        id: 'automatic-capture',
        title: 'Instant Capture',
        description:
          'Every call, text, or chat is answered 24/7. Signmons captures customer info, service need, and urgency on first contact.',
        guardrail: 'No missed leads.',
        illustrationKey: 'capture',
      },
      {
        id: 'smart-sales-strategy',
        title: 'Smart Qualification',
        description:
          'Signmons confirms details, handles objections, and qualifies the job using your rules so only high-intent bookings move forward.',
        guardrail: 'Better leads, less noise.',
        illustrationKey: 'nurture',
      },
      {
        id: 'secure-and-nurture',
        title: 'Secure Booking',
        description:
          'A payment link is sent before dispatch. Once paid, the appointment is confirmed and logged with a full audit trail.',
        guardrail: 'Get paid before truck roll.',
        illustrationKey: 'secure',
      },
      {
        id: 'follow-up-automation',
        title: 'Follow-Up Automation',
        description:
          'If they do not book now, Signmons automatically runs SMS and email follow-up sequences to recover revenue.',
        guardrail: 'No lead goes cold.',
        illustrationKey: 'follow-up',
      },
      {
        id: 'dispatch-intelligence',
        title: 'Dispatch Intelligence',
        description:
          'Your team receives verified job notes, contact details, and timing context so every truck roll starts prepared.',
        guardrail: 'Cleaner handoff, faster close.',
        illustrationKey: 'dispatch',
      },
    ],
  },
  trust: {
    sectionId: 'why-owners-trust',
    title: 'Trust, Safety & Compliance',
    assurancesTitle: 'Integrity Guarantees',
    assurances: [
      'Audit trail for every turn and confirmation.',
      'Tenant isolation enforced on every read/write/inference.',
      'Fail-closed on missing or ambiguous data.',
      'SMS is canonical for name, address, and payment.',
    ],
    metricsTitle: 'SLO Targets (MVP)',
    metrics: [
      {
        label: 'Avg. voice turns per call',
        value: '≤ 8',
      },
      {
        label: 'Voice → SMS handoff rate',
        value: '≥ 80%',
      },
      {
        label: 'Jobs with unconfirmed name/address',
        value: '0',
      },
      {
        label: 'p95 voice response latency',
        value: '< 1.2s',
      },
    ],
  },
  industryFocus: {
    sectionId: 'industry-focus',
    title: 'Industry Focus',
    lead: 'Purpose-built workflows for HVAC, Plumbing, and Electrical service teams.',
    categoryDescription:
      'Signmons defines the AI CSR category: capture demand, qualify intent, and deliver paid, dispatch-ready jobs.',
    modules: [
      {
        id: 'hvac',
        title: 'HVAC',
        focus: 'Capture emergency heat and cooling demand, verify issue details, and book paid service calls quickly.',
      },
      {
        id: 'plumbing',
        title: 'Plumbing',
        focus: 'Turn burst pipe, leak, and water heater requests into qualified, payment-ready jobs with accurate intake.',
      },
      {
        id: 'electrical',
        title: 'Electrical',
        focus: 'Route panel, outage, and service work with complete job notes so crews arrive ready to close.',
      },
    ],
  },
  technicalEdge: {
    sectionId: 'technical-edge',
    title: 'The Technical Edge (For Google Credits)',
    lead: 'Outcome-focused architecture that keeps quality high and data verifiable.',
    diagramTitle: 'Vertex AI + Gemini 1.5 Flash Integration',
    diagramNodes: [
      'Call / Text / Chat Input',
      'FSM Guardrails',
      'Vertex AI + Gemini 1.5 Flash',
      'Validated Job + Payment Trigger',
    ],
    fsmTitle: 'Finite State Machine (FSM) Correctness Layer',
    fsmDescription:
      'FSM transitions enforce required fields and fail-closed behavior so bad data never reaches dispatch...',
  },
  pricing: {
    sectionId: 'pricing-page',
    title: 'The Pricing Page',
    lead: 'Subscription tiers for contractors plus platform booking fees.',
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        price: '$299/mo',
        summary: 'Core AI CSR coverage for small teams...',
      },
      {
        id: 'growth',
        name: 'Growth',
        price: '$699/mo',
        summary: 'Higher throughput, expanded workflows, stronger controls...',
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '$1,499/mo',
        summary: 'Advanced orchestration, segmentation, enterprise governance...',
      },
    ],
    bookingFeeModel:
      'Platform booking fee applies per converted and payment-authorized booking...',
  },
  founder: {
    sectionId: 'founder',
    title: 'About / Founder Section',
    lead: 'Highlighting MBA focus and trade-grounded execution to build authority.',
    points: [
      'MBA-informed sales strategy embedded into objection handling...',
      'Hands-on trade context aligned to dispatch realities...',
      'Execution focus on margin protection, lead quality, and trust...',
    ],
  },
  recommendedPages: {
    sectionId: 'recommended-pages',
    title: 'Recommended Public-Facing Pages',
    pages: [
      {
        id: 'how-it-works-page',
        title: 'The How It Works Page (Process Transparency)',
        summary:
          'Shows exactly how Signmons handles a call from start to finish...',
        bullets: [
          'Step 1: 24/7 answer captures the lead immediately.',
          'Step 2: FSM-guided diagnosis and quote confirmation.',
          'Step 3: Stripe gate secures payment before dispatch.',
        ],
      },
      {
        id: 'industry-pages',
        title: 'Industry-Specific Landing Pages (SEO & Focus)',
        summary:
          'SEO-focused pages for HVAC, Plumbing, and Electrical...',
        bullets: [
          'Signmons for HVAC: emergency heating/cooling workflows.',
          'Signmons for Plumbing: burst pipe and water heater response.',
          'Signmons for Electrical: panel upgrades and outage calls.',
        ],
      },
      {
        id: 'pricing-roi-page',
        title: 'The Pricing & ROI Page',
        summary: 'Transparent tiers and clear ROI case for after-hours capture...',
        bullets: [
          'Subscription tiers by contractor growth stage.',
          'Booking-fee model explained.',
          'ROI calculator concept for missed-call recovery impact.',
        ],
      },
      {
        id: 'mba-insights-page',
        title: 'The MBA Insights (Blog / Resources)',
        summary: 'Thought leadership proving business innovation...',
        bullets: [
          'No-show reduction playbooks.',
          'AI lead nurturing revenue frameworks.',
          'Operational strategy for service businesses.',
        ],
      },
      {
        id: 'legal-foundations-page',
        title: 'Legal & Technical Foundations',
        summary: 'Trust pages that reduce buyer risk for SaaS adoption...',
        bullets: [
          'Privacy policy with multi-tenant isolation language.',
          'Terms of service for business protections.',
        ],
      },
    ],
  },
};

export const tryDemoModalContract: TryDemoModalContract = {
  api: {
    endpoint: 'https://f2c1c2d7f64e.ngrok-free.app/api/marketing/try-demo',
    consentTextVersion: 'try-demo-v1',
    demoScenario: 'hvac',
    callMode: 'immediate',
    fallbackTimeZone: 'America/New_York',
  },
  copy: {
    dialogTitle: 'Try the AI CSR',
    successTitle: 'Calling you now — please answer your phone.',
    successCaption: 'Most demos connect in under 30 seconds.',
    closeLabel: 'Close',
    phoneLabel: 'Phone (E.164)',
    phonePlaceholder: '+12165551234',
    nameLabel: 'First name (optional)',
    companyLabel: 'Company (optional)',
    emailLabel: 'Email (optional)',
    consentLabel: 'I agree to receive an automated call/text for a demo.',
    invalidPhoneError: 'Enter a valid phone number (10 digits or +E.164).',
    consentRequiredError: 'Consent is required to request a demo call.',
    requestFailedError: 'Something went wrong. Please try again.',
    submitLabel: 'Try Demo',
    submittingLabel: 'Submitting…',
  },
};

export const earlyAccessModalContract: EarlyAccessModalContract = {
  copy: {
    dialogTitle: 'Join Early Access',
    successTitle: 'Thanks — we’ll reach out soon.',
    closeLabel: 'Close',
    emailLabel: 'Email',
    submitLabel: 'Join Early Access',
  },
  submitIntent: 'early-access-submit',
};
