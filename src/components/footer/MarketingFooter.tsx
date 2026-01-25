import Button from '@mui/material/Button';

const MarketingFooter = () => {
  return (
    <div className="marketing-footer">
      <Button
        className="hero__primary-cta"
        component="a"
        href="#how-it-works"
        disableRipple
      >
        Book More Jobs
      </Button>
    </div>
  );
};

export default MarketingFooter;
