import type { MouseEvent } from 'react';
import { brandName, marketingCtas, primaryNavigation } from '../../data';
import { getCtaHref, triggerCtaAction } from '../../utils/cta';

type MarketingHeaderProps = {
  onEarlyAccess?: () => void;
};

const getNavLinkClassName = (index: number) =>
  index === 0 ? 'marketing-header__nav-link--how' : undefined;

const MarketingHeader = ({ onEarlyAccess }: MarketingHeaderProps) => {
  const earlyAccessCta = marketingCtas.earlyAccess;
  const earlyAccessHref = getCtaHref(earlyAccessCta.action);

  const handleEarlyAccessClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!earlyAccessHref) {
      event.preventDefault();
    }

    triggerCtaAction(earlyAccessCta, { onEarlyAccess });
  };

  return (
    <div className="marketing-header__inner">
      <div className="marketing-header__brand">{brandName}</div>
      <nav className="marketing-header__nav">
        {primaryNavigation.map((item, index) => (
          <a
            key={item.id}
            className={getNavLinkClassName(index)}
            href={item.action.href}
          >
            {item.label}
          </a>
        ))}
        <a
          className="marketing-header__nav-link--chat"
          href={earlyAccessHref ?? '#'}
          onClick={handleEarlyAccessClick}
          data-intent={earlyAccessCta.intent}
        >
          {earlyAccessCta.label}
        </a>
      </nav>
    </div>
  );
};

export default MarketingHeader;
