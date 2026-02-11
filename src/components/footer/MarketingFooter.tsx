import Button from '@mui/material/Button';
import { homePageCopy, marketingCtas } from '../../data';
import { getCtaHref, triggerCtaAction } from '../../utils/cta';

type MarketingFooterProps = {
  onTryDemo: () => void;
};

const MarketingFooter = ({ onTryDemo }: MarketingFooterProps) => {
  const footerCta = marketingCtas.footerPrimary;
  const ctaHref = getCtaHref(footerCta.action);
  const trustText = homePageCopy.hero.trustTextBreak
    ? `${homePageCopy.hero.trustText}, ${homePageCopy.hero.trustTextBreak}`
    : homePageCopy.hero.trustText;

  return (
    <div className="marketing-footer">
      <Button
        className="hero__primary-cta"
        disableRipple
        type={ctaHref ? undefined : 'button'}
        href={ctaHref}
        onClick={() => triggerCtaAction(footerCta, { onTryDemo })}
        data-intent={footerCta.intent}
      >
        {footerCta.label}
      </Button>
      <div className="hero__trust hero__trust--footer">
        <span className="hero__trust-text">{trustText}</span>
      </div>
    </div>
  );
};

export default MarketingFooter;
