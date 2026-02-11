import type { MarketingCta, NavigationItem } from '../types/marketing';

export const primaryNavigation: NavigationItem[] = [];

export type MarketingCtaKey =
  | 'heroPrimary'
  | 'heroSecondary'
  | 'footerPrimary'
  | 'headerTryDemo'
  | 'earlyAccess';

export const marketingCtas: Record<MarketingCtaKey, MarketingCta> = {
  heroPrimary: {
    id: 'hero-try-demo',
    label: 'Experience the Demo',
    kind: 'primary',
    intent: 'try-demo',
    action: {
      type: 'modal',
      modal: 'try-demo',
    },
  },
  heroSecondary: {
    id: 'hero-see-how',
    label: 'See How It Works',
    kind: 'secondary',
    intent: 'learn-more',
    action: {
      type: 'hash',
      href: '#how-it-works',
    },
  },
  footerPrimary: {
    id: 'footer-try-demo',
    label: 'Experience the Demo',
    kind: 'primary',
    intent: 'try-demo',
    action: {
      type: 'modal',
      modal: 'try-demo',
    },
  },
  headerTryDemo: {
    id: 'header-try-demo',
    label: 'Try Demo',
    kind: 'text',
    intent: 'try-demo',
    action: {
      type: 'modal',
      modal: 'try-demo',
    },
  },
  earlyAccess: {
    id: 'early-access',
    label: 'Join Early Access',
    kind: 'secondary',
    intent: 'early-access',
    action: {
      type: 'modal',
      modal: 'early-access',
    },
  },
};
