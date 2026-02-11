import { marketingCtas } from './navigation';
import type { MarketingService } from '../types/marketing';

export const services: MarketingService[] = [
  {
    id: 'always-on-intake',
    title: '24/7 Call & Text Intake',
    description:
      'Signmons answers after-hours calls, captures lead intent, and keeps your phone from becoming a leak.',
    iconKey: 'phone',
    cta: {
      ...marketingCtas.heroPrimary,
      id: 'service-always-on-intake',
    },
  },
  {
    id: 'qualified-bookings',
    title: 'Qualified Bookings',
    description:
      'Only confirmed details move forward, so your team gets real jobs instead of incomplete requests.',
    iconKey: 'calendar',
    cta: {
      ...marketingCtas.heroPrimary,
      id: 'service-qualified-bookings',
    },
  },
  {
    id: 'payment-first-dispatch',
    title: 'Payment-First Dispatch',
    description:
      'Jobs proceed after payment authorization, reducing unpaid visits and improving scheduling confidence.',
    iconKey: 'shield-check',
    cta: {
      ...marketingCtas.heroPrimary,
      id: 'service-payment-first-dispatch',
    },
  },
  {
    id: 'dispatch-ready-data',
    title: 'Dispatch-Ready Job Data',
    description:
      'Technicians receive cleaner intake records and fewer callback loops before rolling a truck.',
    iconKey: 'clipboard',
    cta: {
      ...marketingCtas.heroPrimary,
      id: 'service-dispatch-ready-data',
    },
  },
];
