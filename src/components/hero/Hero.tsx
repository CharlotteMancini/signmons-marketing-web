import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSoundToggle = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.35;
        audio.loop = true;
        if (next) {
          void audio.play();
        } else {
          audio.pause();
        }
      }
      return next;
    });
  };

  return (
    <section className="hero">
      <audio ref={audioRef} src="/audio/audiosignmons.mp3" preload="auto" />
      <IconButton
        className="hero__sound-toggle"
        onClick={handleSoundToggle}
        aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
        aria-pressed={soundEnabled}
        title={soundEnabled ? 'Sound enabled' : 'Tap for sound'}
        disableRipple
        style={{ position: 'fixed', top: '64px', right: '14px', left: 'auto' }}
      >
        <span aria-hidden="true">♪</span>
      </IconButton>

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
          AI Customer Service Rep
          <span className="hero__title-break">for the Trades</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="hero__subtitle">
          <span className="hero__subtitle-strong">Always On.</span>
          <span className="hero__subtitle-gap" aria-hidden="true" />
          <span className="hero__subtitle-accent">Always Booking.</span>
        </motion.p>

        <motion.ul
          variants={itemVariants}
          className="hero__checklist"
          role="list"
          aria-label="AI customer service rep capabilities"
        >
          <li className="hero__checklist-item">
            <span className="hero__checklist-icon" aria-hidden="true" />
            Answers Calls
          </li>
          <li className="hero__checklist-item">
            <span className="hero__checklist-icon" aria-hidden="true" />
            Gathers Info
          </li>
          <li className="hero__checklist-item">
            <span className="hero__checklist-icon" aria-hidden="true" />
            Processes Payments
          </li>
          <li className="hero__checklist-item">
            <span className="hero__checklist-icon" aria-hidden="true" />
            Books Appts
          </li>
          <li className="hero__checklist-item">
            <span className="hero__checklist-icon" aria-hidden="true" />
            Notifies Tech
          </li>
          <li className="hero__checklist-item">
            <span className="hero__checklist-icon" aria-hidden="true" />
            Tracks Activity
          </li>
        </motion.ul>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="hero__cta hero__cta--bottom"
      >
        <Button
          className="hero__primary-cta"
          disableRipple
          type="button"
          onClick={onTryDemo}
          data-intent="try-demo"
        >
          Try A Demo
        </Button>
        <p className="hero__cta-note">
          We’ll call you right away from +1 216-744-8929.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
