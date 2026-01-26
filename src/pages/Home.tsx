import { useState } from 'react';
import Hero from '../components/hero/Hero';
import MarketingHeader from '../components/header/MarketingHeader';
import IntegrityStrip from '../components/integrity-strip/IntegrityStrip';
import HowItWorks from '../components/how-it-works/HowItWorks';
import WhyOwnersTrust from '../components/why-owners-trust/WhyOwnersTrust';
import MarketingLayout from '../layouts/MarketingLayout';
import { spacing } from '../design/tokens';
import TryDemoModal from '../components/try-demo/TryDemoModal';
import EarlyAccessModal from '../components/early-access/EarlyAccessModal';

const Home = () => {
  const [tryDemoOpen, setTryDemoOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  return (
    <MarketingLayout headerSlot={<MarketingHeader />}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <Hero onTryDemo={() => {
          console.info('[intent]', 'try-demo-click');
          setTryDemoOpen(true);
        }} />
        <IntegrityStrip />
        <HowItWorks />
        <WhyOwnersTrust />
        <section className="conversion-zone">
          <p className="conversion-zone__text">Not ready for a live demo?</p>
          <button
            type="button"
            className="conversion-zone__cta"
            onClick={() => {
              console.info('[intent]', 'early-access-click');
              setEarlyAccessOpen(true);
            }}
            data-intent="early-access"
          >
            Join Early Access
          </button>
        </section>
      </main>
      <TryDemoModal open={tryDemoOpen} onClose={() => setTryDemoOpen(false)} />
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)} />
    </MarketingLayout>
  );
};

export default Home;
