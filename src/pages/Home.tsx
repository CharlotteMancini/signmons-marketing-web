import { useState } from 'react';
import Hero from '../components/hero/Hero';
import MarketingHeader from '../components/header/MarketingHeader';
import IntegrityStrip from '../components/integrity-strip/IntegrityStrip';
import HowItWorks from '../components/how-it-works/HowItWorks';
import WhyOwnersTrust from '../components/why-owners-trust/WhyOwnersTrust';
import MarketingLayout from '../layouts/MarketingLayout';
import { spacing } from '../design/tokens';
import TryDemoModal from '../components/try-demo/TryDemoModal';

const Home = () => {
  const [tryDemoOpen, setTryDemoOpen] = useState(false);

  return (
    <MarketingLayout headerSlot={<MarketingHeader />}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <Hero
          onTryDemo={() => {
            console.info('[intent]', 'try-demo-click');
            setTryDemoOpen(true);
          }}
        />
        <IntegrityStrip />
        <HowItWorks />
        <WhyOwnersTrust />
      </main>
      <TryDemoModal open={tryDemoOpen} onClose={() => setTryDemoOpen(false)} />
    </MarketingLayout>
  );
};

export default Home;
