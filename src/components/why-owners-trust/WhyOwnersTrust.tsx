import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { homePageCopy } from '../../data';
import { sectionContainerVariants } from '../motion/presets';
import SectionBlock from '../ui/SectionBlock';
import GlassCard from '../ui/GlassCard';

const WhyOwnersTrust = () => {
  const { trust } = homePageCopy;

  return (
    <SectionBlock id={trust.sectionId} variant="trust" title={trust.title}>
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="show"
        className="trust-panels"
      >
        <GlassCard variant="trust" className="trust-card">
          <div aria-hidden="true" className="trust-icon" />
          <Typography component={motion.p} variant="subtitle1" className="trust-card__title">
            {trust.assurancesTitle}
          </Typography>
          <ul className="trust-list">
            {trust.assurances.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard variant="trust" className="trust-card">
          <div aria-hidden="true" className="trust-icon trust-icon--metrics" />
          <Typography component={motion.p} variant="subtitle1" className="trust-card__title">
            {trust.metricsTitle}
          </Typography>
          <ul className="trust-metrics">
            {trust.metrics.map((metric) => (
              <li key={metric.label}>
                <span className="trust-metrics__label">{metric.label}</span>
                <span className="trust-metrics__value">{metric.value}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>
    </SectionBlock>
  );
};

export default WhyOwnersTrust;
