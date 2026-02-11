import { useState } from 'react';
import Hero from '../components/hero/Hero';
import MarketingHeader from '../components/header/MarketingHeader';
import HowItWorks from '../components/how-it-works/HowItWorks';
import TrustPlaneSections from '../components/trust-plane/TrustPlaneSections';
import MarketingLayout from '../layouts/MarketingLayout';
import { spacing } from '../design/tokens';
import TryDemoModal from '../components/try-demo/TryDemoModal';
import EarlyAccessModal from '../components/early-access/EarlyAccessModal';

const Home = () => {
  const [tryDemoOpen, setTryDemoOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  return (
    <MarketingLayout
      headerSlot={<MarketingHeader onEarlyAccess={() => setEarlyAccessOpen(true)} />}
    >
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <Hero
          onTryDemo={() => {
            setTryDemoOpen(true);
          }}
        />
        <HowItWorks />
        <TrustPlaneSections />
      </main>
      <TryDemoModal open={tryDemoOpen} onClose={() => setTryDemoOpen(false)} />
      <EarlyAccessModal
        open={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
      />
    </MarketingLayout>
  );
};

export default Home;
