import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { sectionContainerVariants, sectionItemVariants } from '../motion/presets';

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ');

type SectionBlockProps = {
  id?: string;
  className?: string;
  variant?: 'default' | 'methods' | 'trust' | 'integrity';
  title: string;
  lead?: string;
  titleSx?: SxProps<Theme>;
  leadSx?: SxProps<Theme>;
  children: ReactNode;
};

const SectionBlock = ({
  id,
  className,
  variant = 'default',
  title,
  lead,
  titleSx,
  leadSx,
  children,
}: SectionBlockProps) => {
  const defaultTitleSx: SxProps<Theme> = {
    m: 0,
    display: 'block',
    width: '100%',
    textAlign: 'center',
    mx: 'auto',
    fontFamily: 'inherit',
    fontWeight: 700,
    fontSize: { xs: '32px', sm: '40px', md: '46px' },
    lineHeight: 1.15,
    letterSpacing: '0.01em',
    ...(variant === 'methods'
      ? {
          textAlign: 'center',
          color: '#f28bff',
          textShadow: '0 4px 14px rgba(224, 114, 255, 0.4)',
          fontSize: { xs: '30px', sm: '38px', md: '44px' },
          lineHeight: 1.2,
          textWrap: 'balance',
          maxWidth: '24ch',
          mx: 'auto',
        }
      : {}),
  };

  const defaultLeadSx: SxProps<Theme> = {
    mt: 1.5,
    fontFamily: 'inherit',
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    lineHeight: 1.4,
    color: 'rgba(255, 255, 255, 0.9)',
    ...(variant === 'methods'
      ? {
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.94)',
          maxWidth: '780px',
          mx: 'auto',
          mt: 2,
          fontSize: { xs: '18px', sm: '20px', md: '24px' },
        }
      : {}),
  };

  return (
    <section
      id={id}
      className={joinClassNames('section-panel', 'section-block', `section-block--${variant}`, className)}
    >
      <motion.div variants={sectionContainerVariants} initial="hidden" animate="show">
        <Typography
          component={motion.h2}
          variants={sectionItemVariants}
          className="section-title"
          variant="h2"
          sx={{ ...(defaultTitleSx as object), ...((titleSx as object) ?? {}) }}
        >
          {title}
        </Typography>
        {lead ? (
          <Typography
            component={motion.p}
            variants={sectionItemVariants}
            className="section-lead"
            variant="body1"
            sx={{ ...(defaultLeadSx as object), ...((leadSx as object) ?? {}) }}
          >
            {lead}
          </Typography>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
};

export default SectionBlock;
