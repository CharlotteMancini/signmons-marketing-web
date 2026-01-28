import Button from '@mui/material/Button';

type MarketingFooterProps = {
  onTryDemo: () => void;
};

const MarketingFooter = ({ onTryDemo }: MarketingFooterProps) => {
  return (
    <div className="marketing-footer">
      <Button
        className="hero__primary-cta"
        disableRipple
        type="button"
        onClick={onTryDemo}
        data-intent="try-demo"
      >
        Experience the Demo
      </Button>
      <div className="hero__trust hero__trust--footer">
        <span className="hero__trust-text">
          Trusted by HVAC, Plumbing, Electrical &amp; Construction
        </span>
      </div>
    </div>
  );
};

export default MarketingFooter;
