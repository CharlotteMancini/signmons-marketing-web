import { motion } from 'framer-motion';
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

const Hero = () => {
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
          Your AI Dispatcher
          <span className="hero__title-break">for the Trades</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="hero__subtitle">
          Always On. <span className="hero__subtitle-accent">Always Booking.</span>
        </motion.div>

        <motion.div variants={itemVariants} className="hero__card">
          <ul className="hero__list">
            <li>
              <span className="hero__check">✓</span>
              Answers Calls
            </li>
            <li>
              <span className="hero__check">✓</span>
              Gathers Customer Info
            </li>
            <li>
              <span className="hero__check">✓</span>
              Processes Payments
            </li>
            <li>
              <span className="hero__check">✓</span>
              Books Jobs
            </li>
            <li>
              <span className="hero__check">✓</span>
              Sends Appt To Tech
            </li>
          </ul>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
