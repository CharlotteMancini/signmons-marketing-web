import Hero from '../components/hero/Hero';
import MarketingFooter from '../components/footer/MarketingFooter';
import MarketingHeader from '../components/header/MarketingHeader';
import HowItWorks from '../components/how-it-works/HowItWorks';
import WhyOwnersTrust from '../components/why-owners-trust/WhyOwnersTrust';
import MarketingLayout from '../layouts/MarketingLayout';
import { spacing } from '../design/tokens';

const Home = () => {
  return (
    <MarketingLayout headerSlot={<MarketingHeader />} footerSlot={<MarketingFooter />}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <Hero />
        <HowItWorks />
        <WhyOwnersTrust />
      </main>
    </MarketingLayout>
  );
};

export default Home;
