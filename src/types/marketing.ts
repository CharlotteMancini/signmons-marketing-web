export type MarketingRoute =
  | '/'
  | '/start-design'
  | '/contact'
  | '/about'
  | '/how-it-works'
  | '/trust';

export type MarketingHashTarget = '#how-it-works' | '#why-owners-trust';

export type CtaKind = 'primary' | 'secondary' | 'text';

export type CtaIntent =
  | 'try-demo'
  | 'start-design'
  | 'contact'
  | 'learn-more'
  | 'early-access';

export type CtaAction =
  | { type: 'route'; href: MarketingRoute }
  | { type: 'hash'; href: MarketingHashTarget }
  | { type: 'modal'; modal: 'try-demo' | 'early-access' };

export interface MarketingCta {
  id: string;
  label: string;
  kind: CtaKind;
  intent: CtaIntent;
  action: CtaAction;
}

export interface NavigationItem {
  id: string;
  label: string;
  action: Extract<CtaAction, { type: 'route' | 'hash' }>;
}

export type ServiceIconKey =
  | 'phone'
  | 'calendar'
  | 'shield-check'
  | 'clipboard'
  | 'chart';

export interface MarketingService {
  id: string;
  title: string;
  description: string;
  iconKey: ServiceIconKey;
  cta: MarketingCta;
}

export type HeroCapabilityIconKey =
  | 'call'
  | 'jobs'
  | 'schedule'
  | 'payment'
  | 'updates'
  | 'insights';

export interface HeroCapability {
  id: string;
  lineOne: string;
  lineTwo: string;
  iconKey: HeroCapabilityIconKey;
}

export interface HeroCopy {
  title: string;
  titleBreak?: string;
  lead: string;
  capabilities: HeroCapability[];
  primaryCta: MarketingCta;
  trustText: string;
  trustTextBreak?: string;
}

export interface MarketingVideoAsset {
  id: 'local-demo' | 'vimeo-demo';
  title: string;
  src: string;
  poster: string;
  ariaLabel: string;
}

export type IntegrityTone = 'payment' | 'tenant';

export interface IntegrityCardCopy {
  id: string;
  title: string;
  description: string;
  tone: IntegrityTone;
}

export interface IntegritySectionCopy {
  videos: MarketingVideoAsset[];
  cards: IntegrityCardCopy[];
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  guardrail?: string;
  illustrationKey: 'capture' | 'nurture' | 'secure' | 'follow-up' | 'dispatch';
}

export interface HowItWorksCopy {
  sectionId: 'how-it-works';
  title: string;
  lead: string;
  steps: HowItWorksStep[];
}

export interface TrustMetric {
  label: string;
  value: string;
}

export interface TrustSectionCopy {
  sectionId: 'why-owners-trust';
  title: string;
  assurancesTitle: string;
  assurances: string[];
  metricsTitle: string;
  metrics: TrustMetric[];
}

export interface IndustryModuleCopy {
  id: string;
  title: string;
  focus: string;
}

export interface IndustryFocusCopy {
  sectionId: 'industry-focus';
  title: string;
  lead: string;
  categoryDescription: string;
  modules: IndustryModuleCopy[];
}

export interface TechnicalEdgeCopy {
  sectionId: 'technical-edge';
  title: string;
  lead: string;
  diagramTitle: string;
  diagramNodes: string[];
  fsmTitle: string;
  fsmDescription: string;
}

export interface PricingTierCopy {
  id: string;
  name: string;
  price: string;
  summary: string;
}

export interface PricingSectionCopy {
  sectionId: 'pricing-page';
  title: string;
  lead: string;
  tiers: PricingTierCopy[];
  bookingFeeModel: string;
}

export interface FounderSectionCopy {
  sectionId: 'founder';
  title: string;
  lead: string;
  points: string[];
}

export interface RecommendedPageCopy {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
}

export interface RecommendedPagesCopy {
  sectionId: 'recommended-pages';
  title: string;
  pages: RecommendedPageCopy[];
}

export interface HomePageCopy {
  hero: HeroCopy;
  integrity: IntegritySectionCopy;
  howItWorks: HowItWorksCopy;
  trust: TrustSectionCopy;
  industryFocus: IndustryFocusCopy;
  technicalEdge: TechnicalEdgeCopy;
  pricing: PricingSectionCopy;
  founder: FounderSectionCopy;
  recommendedPages: RecommendedPagesCopy;
}

export interface SeoPageMeta {
  route: MarketingRoute;
  title: string;
  description: string;
  keywords: string[];
}

export interface TryDemoApiConfig {
  endpoint: string;
  consentTextVersion: string;
  demoScenario: string;
  callMode: 'immediate';
  fallbackTimeZone: string;
}

export interface TryDemoModalCopy {
  dialogTitle: string;
  successTitle: string;
  successCaption: string;
  closeLabel: string;
  phoneLabel: string;
  phonePlaceholder: string;
  nameLabel: string;
  companyLabel: string;
  emailLabel: string;
  consentLabel: string;
  invalidPhoneError: string;
  consentRequiredError: string;
  requestFailedError: string;
  submitLabel: string;
  submittingLabel: string;
}

export interface TryDemoModalContract {
  api: TryDemoApiConfig;
  copy: TryDemoModalCopy;
}

export interface EarlyAccessModalCopy {
  dialogTitle: string;
  successTitle: string;
  closeLabel: string;
  emailLabel: string;
  submitLabel: string;
}

export interface EarlyAccessModalContract {
  copy: EarlyAccessModalCopy;
  submitIntent: string;
}
