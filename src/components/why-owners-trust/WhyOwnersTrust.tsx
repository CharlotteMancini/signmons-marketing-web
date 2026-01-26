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

const assurances = [
  'Audit trail for every turn and confirmation.',
  'Tenant isolation enforced on every read/write/inference.',
  'Fail-closed on missing or ambiguous data.',
  'SMS is canonical for name, address, and payment.',
];

const sloTargets = [
  {
    label: 'Avg. voice turns per call',
    value: '≤ 8',
  },
  {
    label: 'Voice → SMS handoff rate',
    value: '≥ 80%',
  },
  {
    label: 'SMS confirmation completion',
    value: '≥ 85%',
  },
  {
    label: 'Jobs with unconfirmed name/address',
    value: '0',
  },
  {
    label: 'p95 voice response latency',
    value: '< 1.2s',
  },
];

const WhyOwnersTrust = () => {
  return (
    <section id="why-owners-trust" className="trust-section">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <MotionTypography variants={itemVariants} className="section-title" variant="h2">
          Trust, Safety &amp; Compliance
        </MotionTypography>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="trust-panels"
      >
        <motion.div variants={itemVariants} className="trust-card">
          <div aria-hidden="true" className="trust-icon" />
          <MotionTypography variant="subtitle1" className="trust-card__title">
            Integrity Guarantees
          </MotionTypography>
          <ul className="trust-list">
            {assurances.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="trust-card">
          <div aria-hidden="true" className="trust-icon trust-icon--metrics" />
          <MotionTypography variant="subtitle1" className="trust-card__title">
            SLO Targets (MVP)
          </MotionTypography>
          <ul className="trust-metrics">
            {sloTargets.map((metric) => (
              <li key={metric.label}>
                <span className="trust-metrics__label">{metric.label}</span>
                <span className="trust-metrics__value">{metric.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyOwnersTrust;
