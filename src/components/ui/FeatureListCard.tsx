import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GlassCard from './GlassCard';

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ');

type FeatureListCardProps = {
  title: string;
  description: string;
  caption?: string;
  illustration: ReactNode;
  className?: string;
};

const FeatureListCard = ({
  title,
  description,
  caption,
  illustration,
  className,
}: FeatureListCardProps) => {
  return (
    <GlassCard variant="methods" className={joinClassNames('feature-list-card', className)}>
      <Stack spacing={{ xs: 1, md: 1.25 }} alignItems="center">
        <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
          <Typography
            variant="subtitle1"
            sx={{
              m: 0,
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(6, 8, 24, 0.34)',
              letterSpacing: '0.01em',
              fontWeight: 700,
              fontSize: { xs: '20px', sm: '22px', md: '24px' },
              lineHeight: 1.22,
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            m: 0,
            color: 'rgba(255, 255, 255, 0.92)',
            textShadow: '0 2px 8px rgba(6, 8, 24, 0.25)',
            fontSize: { xs: '15px', sm: '16px', md: '17px' },
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
      </Stack>
      <motion.div
        aria-hidden="true"
        className="feature-list-card__illustration"
        initial={{ opacity: 0.45, scale: 0.94, y: 14 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.65, margin: '-10% 0px -58% 0px' }}
        transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
      >
        {illustration}
      </motion.div>
      {caption ? (
        <Typography
          variant="caption"
          sx={{
            mt: '2px',
            color: 'rgba(255, 255, 255, 0.82)',
            letterSpacing: '0.01em',
            fontWeight: 500,
            fontSize: { xs: '13px', sm: '14px', md: '15px' },
            lineHeight: 1.35,
          }}
        >
          {caption}
        </Typography>
      ) : null}
    </GlassCard>
  );
};

export default FeatureListCard;
