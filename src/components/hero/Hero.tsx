import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { homePageCopy } from '../../data';
import { motion as motionTokens } from '../../design/tokens';
import type { HeroCapabilityIconKey } from '../../types';
import { getCtaHref, triggerCtaAction } from '../../utils/cta';
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

const capabilityIcons: Record<HeroCapabilityIconKey, ReactNode> = {
  call: (
    <svg viewBox="0 0 24 24" className="hero__glass-svg">
      <path d="M7 4h3l1 4-2 1c1.1 2.1 2.9 3.9 5 5l1-2 4 1v3a2 2 0 0 1-2 2C9.3 20 4 14.7 4 7a3 3 0 0 1 3-3z" />
    </svg>
  ),
  jobs: (
    <svg viewBox="0 0 24 24" className="hero__glass-svg">
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  ),
  schedule: (
    <svg viewBox="0 0 24 24" className="hero__glass-svg">
      <rect x="6" y="5" width="12" height="16" rx="2" />
      <path d="M9 5V3h6v2M9 11h6M9 15h4" />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" className="hero__glass-svg">
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
      <path d="M12 9v6M10 13h4" />
    </svg>
  ),
  updates: (
    <svg viewBox="0 0 24 24" className="hero__glass-svg">
      <path d="M6 10a6 6 0 0 1 12 0v4l2 2H4l2-2v-4z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  ),
  insights: (
    <svg viewBox="0 0 24 24" className="hero__glass-svg">
      <path d="M5 19V9M12 19V5M19 19v-8M4 19h16" />
    </svg>
  ),
};

type HeroProps = {
  onTryDemo?: () => void;
  onEarlyAccess?: () => void;
};

const Hero = ({ onTryDemo, onEarlyAccess }: HeroProps) => {
  const { hero } = homePageCopy;
  const primaryCtaHref = getCtaHref(hero.primaryCta.action);
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

  const handlePrimaryCtaClick = () => {
    console.info('[intent]', `${hero.primaryCta.intent}-click`);
    triggerCtaAction(hero.primaryCta, { onTryDemo, onEarlyAccess });
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
        style={{ position: 'fixed', top: '30px', right: '14px', left: 'auto' }}
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
          {hero.title}
          {hero.titleBreak ? (
            <span className="hero__title-break">{hero.titleBreak}</span>
          ) : null}
        </motion.h1>

        <motion.p variants={itemVariants} className="hero__lead hero__lead--intro">
          {hero.lead}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="hero__glass-grid"
          role="list"
          aria-label="AI front desk capabilities"
        >
          {hero.capabilities.map((capability) => (
            <div key={capability.id} className="hero__glass-cell" role="listitem">
              <span className="hero__glass-icon" aria-hidden="true">
                {capabilityIcons[capability.iconKey]}
              </span>
              <span className="hero__glass-label">
                <span className="hero__glass-label-line">{capability.lineOne}</span>
                <span className="hero__glass-label-line">{capability.lineTwo}</span>
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="hero__cta">
          <Button
            className="hero__primary-cta"
            disableRipple
            type={primaryCtaHref ? undefined : 'button'}
            href={primaryCtaHref}
            onClick={handlePrimaryCtaClick}
            data-intent={hero.primaryCta.intent}
          >
            {hero.primaryCta.label}
          </Button>
          <div className="hero__trust hero__trust--footer">
            <span className="hero__trust-text">
              {hero.trustText}
              {hero.trustTextBreak ? (
                <span className="hero__trust-break">{hero.trustTextBreak}</span>
              ) : null}
            </span>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
