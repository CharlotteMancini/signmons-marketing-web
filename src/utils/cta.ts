import type { CtaAction, MarketingCta } from '../types';

type CtaHandlers = {
  onTryDemo?: () => void;
  onEarlyAccess?: () => void;
};

export const getCtaHref = (action: CtaAction): string | undefined =>
  action.type === 'modal' ? undefined : action.href;

export const triggerCtaAction = (
  cta: MarketingCta,
  handlers: CtaHandlers = {}
) => {
  if (cta.action.type !== 'modal') {
    return;
  }

  if (cta.action.modal === 'try-demo') {
    handlers.onTryDemo?.();
    return;
  }

  handlers.onEarlyAccess?.();
};
