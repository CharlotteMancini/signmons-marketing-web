import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
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

const MotionTypography = motion(Typography);

const steps = [
  {
    title: 'Voice Intake',
    description: 'AI answers every call instantly.',
    guardrail: 'Voice captures intent only.',
  },
  {
    title: 'SMS Confirmation',
    description: 'Only text messages finalize bookings.',
    guardrail: 'SMS locks the details.',
  },
  {
    title: 'Payment Authorization',
    description: 'Jobs proceed only after payment approval.',
    guardrail: 'No unpaid dispatches.',
  },
  {
    title: 'Job Created',
    description: 'Confirmed, paid, and ready for dispatch.',
    guardrail: 'FSM approves every step.',
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
        className="pipeline"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            className="pipeline-step"
          >
            <div className="pipeline-step__header">
              <div className="pipeline-step__index">{index + 1}</div>
              <div aria-hidden="true" className="pipeline-step__icon" />
            </div>
            <Typography variant="subtitle1" className="pipeline-step__title">
              {step.title}
            </Typography>
            <Typography variant="body1" className="pipeline-step__description">
              {step.description}
            </Typography>
            <Typography variant="caption" className="pipeline-step__guardrail">
              {step.guardrail}
            </Typography>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
