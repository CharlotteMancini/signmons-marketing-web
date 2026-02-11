import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { sectionItemVariants } from '../motion/presets';

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ');

type GlassCardProps = {
  className?: string;
  variant?: 'default' | 'methods' | 'trust' | 'integrity';
  children: ReactNode;
};

const GlassCard = ({ className, variant = 'default', children }: GlassCardProps) => {
  return (
    <motion.div
      variants={sectionItemVariants}
      className={joinClassNames('glass-card', `glass-card--${variant}`, className)}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
