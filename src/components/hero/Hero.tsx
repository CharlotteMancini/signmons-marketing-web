import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { motion as motionTokens } from '../../design/tokens';
import HeroModel from './HeroModel';

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

type HeroProps = {
  onTryDemo: () => void;
};

const Hero = ({ onTryDemo }: HeroProps) => {
  return (
    <section className="hero">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hero__visual"
        aria-hidden="true"
      >
        <motion.div variants={itemVariants} className="hero__model">
          <HeroModel />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hero__content"
      >
        <motion.h1 variants={itemVariants} className="hero__title">
          AI Dispatcher
          <span className="hero__title-break">for the Trades</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="hero__subtitle">
          Always On. <span className="hero__subtitle-accent">Always Booking.</span>
        </motion.p>

        <motion.div variants={itemVariants} className="hero__cta">
          <Button
            className="hero__primary-cta"
            disableRipple
            type="button"
            onClick={onTryDemo}
            data-intent="try-demo"
          >
            Try Demo
          </Button>
          <p className="hero__cta-note">
            We’ll call you right away from +1 216-744-8929.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
