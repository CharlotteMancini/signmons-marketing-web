import { motion } from 'framer-motion';
import { motion as motionTokens } from '../../design/tokens';

const toSeconds = (msValue: string) => Number(msValue.replace('ms', '')) / 1000;
const toBezierArray = (bezier: string) =>
  bezier
    .replace('cubic-bezier(', '')
    .replace(')', '')
    .split(',')
    .map((value) => Number(value.trim())) as [number, number, number, number];

const baseDuration = toSeconds(motionTokens.duration.standard);
const baseEase = toBezierArray(motionTokens.easing.standard);

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: baseDuration * 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: baseDuration,
      ease: baseEase,
    },
  },
};

const pillars = [
  {
    title: 'No guessing. Ever.',
    subline: 'Every detail confirmed before dispatch.',
  },
  {
    title: 'No unpaid jobs.',
    subline: 'Payment secured up front.',
  },
  {
    title: 'Dispatcher sanity preserved.',
    subline: 'Only confirmed data reaches the board.',
  },
  {
    title: 'Full audit trail.',
    subline: 'Every decision logged and reviewable.',
  },
];

const WhyOwnersTrust = () => {
  return (
    <section id="why-owners-trust" className="trust-section">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.h2 variants={itemVariants} className="section-title">
          Chat
        </motion.h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="trust-grid"
      >
        {pillars.map((pillar) => (
          <motion.div key={pillar.title} variants={itemVariants} className="trust-card">
            <div aria-hidden="true" className="trust-icon" />
            <div className="step-title">
              {pillar.title}
            </div>
            <div className="step-description">
              {pillar.subline}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyOwnersTrust;
