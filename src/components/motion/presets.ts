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

export const sectionContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: baseDuration * 0.6,
    },
  },
};

export const sectionItemVariants = {
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
