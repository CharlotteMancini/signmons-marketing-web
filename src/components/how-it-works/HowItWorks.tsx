import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { badges, motion as motionTokens } from '../../design/tokens';

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

const MotionTypography = motion(Typography);

const steps = [
  {
    title: 'Answer Every Call',
    description: 'AI acknowledges instantly.',
  },
  {
    title: 'Confirm Name & Address',
    description: 'No dispatch without verification.',
    badge: {
      label: 'Confirmed',
      styles: badges.confirmed,
    },
  },
  {
    title: 'Secure Payment',
    description: 'Collect before scheduling.',
    badge: {
      label: 'Confirmed',
      styles: badges.confirmed,
    },
  },
  {
    title: 'Create Job',
    description: 'Verified record created automatically.',
  },
  {
    title: 'Dispatcher Sees Confirmed Data Only',
    description: 'Only confirmed data reaches dispatch.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-panel">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <MotionTypography variants={itemVariants} className="section-title" variant="h2">
          How It Works
        </MotionTypography>
        <MotionTypography
          variants={itemVariants}
          className="section-lead"
          variant="body1"
          component="p"
        >
          A controlled intake sequence that never guesses.
        </MotionTypography>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="step-grid"
      >
        {steps.map((step) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            className="step-card"
          >
            <div aria-hidden="true" className="step-icon" />
            <div className="step-text">
              <div className="step-title">
                {step.title}
              </div>
              {step.badge ? (
                <div
                  className="step-badge"
                  style={{
                    border: `1px solid ${step.badge.styles.border}`,
                    backgroundColor: step.badge.styles.background,
                    color: step.badge.styles.text,
                  }}
                >
                  {step.badge.label}
                </div>
              ) : null}
              <div className="step-description">
                {step.description}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
