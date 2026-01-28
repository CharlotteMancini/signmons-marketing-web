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
  onTryDemo?: () => void;
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
        style={{ position: 'fixed', top: '24px', right: '14px', left: 'auto' }}
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
          The AI Front Desk
          <span className="hero__title-break">Built for the Trades</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="hero__lead hero__lead--intro">
          From the first ring to the final invoice, Signmons manages customer calls, bookings,
          and payments both beautifully and reliably.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="hero__glass-grid"
          role="list"
          aria-label="AI front desk capabilities"
        >
          <div className="hero__glass-cell" role="listitem">
            <span className="hero__glass-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero__glass-svg">
                <path d="M7 4h3l1 4-2 1c1.1 2.1 2.9 3.9 5 5l1-2 4 1v3a2 2 0 0 1-2 2C9.3 20 4 14.7 4 7a3 3 0 0 1 3-3z" />
              </svg>
            </span>
            <span className="hero__glass-label">24/7 Call Answering</span>
          </div>
          <div className="hero__glass-cell" role="listitem">
            <span className="hero__glass-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero__glass-svg">
                <rect x="4" y="6" width="16" height="14" rx="2" />
                <path d="M8 3v4M16 3v4M4 10h16" />
              </svg>
            </span>
            <span className="hero__glass-label">Automated Scheduling</span>
          </div>
          <div className="hero__glass-cell" role="listitem">
            <span className="hero__glass-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero__glass-svg">
                <rect x="6" y="5" width="12" height="16" rx="2" />
                <path d="M9 5V3h6v2M9 11h6M9 15h4" />
              </svg>
            </span>
            <span className="hero__glass-label">Smart Lead Intake</span>
          </div>
          <div className="hero__glass-cell" role="listitem">
            <span className="hero__glass-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero__glass-svg">
                <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
                <path d="M12 9v6M10 13h4" />
              </svg>
            </span>
            <span className="hero__glass-label">Secure Payments</span>
          </div>
          <div className="hero__glass-cell" role="listitem">
            <span className="hero__glass-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero__glass-svg">
                <path d="M6 10a6 6 0 0 1 12 0v4l2 2H4l2-2v-4z" />
                <path d="M10 18a2 2 0 0 0 4 0" />
              </svg>
            </span>
            <span className="hero__glass-label">Real-Time Notifications</span>
          </div>
          <div className="hero__glass-cell" role="listitem">
            <span className="hero__glass-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero__glass-svg">
                <path d="M5 19V9M12 19V5M19 19v-8M4 19h16" />
              </svg>
            </span>
            <span className="hero__glass-label">Activity Intelligence</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hero__cta">
          <Button
            className="hero__primary-cta"
            disableRipple
            type="button"
            onClick={onTryDemo}
            data-intent="try-demo"
          >
            Experience the Demo
          </Button>
          <div className="hero__trust hero__trust--footer">
            <span className="hero__trust-text">
              Trusted by HVAC, Plumbing
              <span className="hero__trust-break">Electrical &amp; Construction</span>
            </span>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
