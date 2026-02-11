import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { homePageCopy } from '../../data';
import { sectionContainerVariants } from '../motion/presets';
import SectionBlock from '../ui/SectionBlock';
import GlassCard from '../ui/GlassCard';
import FeatureListCard from '../ui/FeatureListCard';

const hvacFallbackIllustration = (
  <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
      <rect x="0" y="0" width="320" height="170" rx="16" fill="rgba(253, 236, 180, 0.08)" />
      <rect x="122" y="30" width="76" height="86" rx="12" fill="#3f95ad" />
      <rect x="138" y="18" width="44" height="18" rx="6" fill="#f6b73c" />
      <circle cx="160" cy="16" r="7" fill="#f1d8ab" />
      <rect x="92" y="40" width="30" height="60" rx="10" fill="#2f6f86" />
      <rect x="198" y="40" width="30" height="60" rx="10" fill="#2f6f86" />
      <rect x="132" y="62" width="56" height="10" rx="3" fill="#f9c447" />
      <rect x="132" y="78" width="56" height="10" rx="3" fill="#f9c447" />
      <path d="M138 116l-16 42h26l12-42z" fill="#f2634c" />
      <path d="M182 116l16 42h-26l-12-42z" fill="#f2634c" />
      <rect x="16" y="120" width="74" height="34" rx="8" fill="#2f6f86" opacity="0.78" />
      <path d="M34 148h30M42 138h18" stroke="#f9d88b" strokeWidth="3" strokeLinecap="round" />
      <rect x="234" y="118" width="70" height="36" rx="8" fill="#3f95ad" opacity="0.8" />
      <path d="M252 146h30M256 136h22" stroke="#f9d88b" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const HvacIndustryIllustration = () => {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return hvacFallbackIllustration;
  }

  return (
    <img
      src="/media/hvac-card-image.png"
      alt=""
      aria-hidden="true"
      className="trust-plane__industry-image"
      onError={() => setUseFallback(true)}
    />
  );
};

const industryIllustrationById: Record<string, ReactNode> = {
  hvac: <HvacIndustryIllustration />,
  plumbing: (
    <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
      <rect x="0" y="0" width="320" height="170" rx="16" fill="rgba(253, 236, 180, 0.08)" />
      <rect x="122" y="30" width="76" height="86" rx="12" fill="#4a8ea1" />
      <rect x="138" y="18" width="44" height="18" rx="6" fill="#f6b73c" />
      <circle cx="160" cy="16" r="7" fill="#f1d8ab" />
      <rect x="92" y="40" width="30" height="60" rx="10" fill="#356f83" />
      <rect x="198" y="40" width="30" height="60" rx="10" fill="#356f83" />
      <rect x="132" y="62" width="56" height="10" rx="3" fill="#f9c447" />
      <path d="M144 116l-14 42h24l10-42z" fill="#f2634c" />
      <path d="M176 116l14 42h-24l-10-42z" fill="#f2634c" />
      <path d="M42 60h56a12 12 0 0 1 12 12v12h52" stroke="#8ac9d9" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M42 60h56a12 12 0 0 1 12 12v12h52" stroke="#f9d88b" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="232" cy="120" r="18" fill="#2f6f86" opacity="0.85" />
      <path d="M222 120h20M232 110v20" stroke="#f9d88b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  electrical: (
    <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
      <rect x="0" y="0" width="320" height="170" rx="16" fill="rgba(253, 236, 180, 0.08)" />
      <rect x="122" y="30" width="76" height="86" rx="12" fill="#3f95ad" />
      <rect x="138" y="18" width="44" height="18" rx="6" fill="#f6b73c" />
      <circle cx="160" cy="16" r="7" fill="#f1d8ab" />
      <rect x="92" y="40" width="30" height="60" rx="10" fill="#2f6f86" />
      <rect x="198" y="40" width="30" height="60" rx="10" fill="#2f6f86" />
      <rect x="132" y="62" width="56" height="10" rx="3" fill="#f9c447" />
      <path d="M138 116l-16 42h26l12-42z" fill="#f2634c" />
      <path d="M182 116l16 42h-26l-12-42z" fill="#f2634c" />
      <path d="M236 48l-24 34h16l-4 20 28-40h-16l3-14z" fill="#f9c447" stroke="#2f6f86" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="224" y="106" width="66" height="44" rx="8" fill="#2f6f86" opacity="0.82" />
      <path d="M238 128h38M244 118h24" stroke="#f9d88b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};

const TrustPlaneSections = () => {
  const { industryFocus, technicalEdge, pricing, founder, recommendedPages } = homePageCopy;

  return (
    <>
      <SectionBlock
        id={industryFocus.sectionId}
        variant="methods"
        title={industryFocus.title}
        lead={industryFocus.lead}
      >
        <Typography className="trust-plane__category-note" variant="body1">
          {industryFocus.categoryDescription}
        </Typography>
        <motion.div variants={sectionContainerVariants} initial="hidden" animate="show" className="trust-plane__grid trust-plane__grid--industry">
          {industryFocus.modules.map((module) => (
            <FeatureListCard
              key={module.id}
              className="pipeline-step trust-plane__industry-card"
              title={module.title}
              description={module.focus}
              illustration={industryIllustrationById[module.id]}
            />
          ))}
        </motion.div>
      </SectionBlock>

      <SectionBlock
        id={technicalEdge.sectionId}
        variant="methods"
        title={technicalEdge.title}
        lead={technicalEdge.lead}
      >
        <motion.div variants={sectionContainerVariants} initial="hidden" animate="show" className="trust-plane__grid trust-plane__grid--tech">
          <GlassCard variant="methods" className="trust-plane__card">
            <Typography variant="subtitle1" className="trust-plane__card-title">
              {technicalEdge.diagramTitle}
            </Typography>
            <ol className="trust-plane__sequence">
              {technicalEdge.diagramNodes.map((node) => (
                <li key={node}>{node}</li>
              ))}
            </ol>
          </GlassCard>
          <GlassCard variant="methods" className="trust-plane__card">
            <Typography variant="subtitle1" className="trust-plane__card-title">
              {technicalEdge.fsmTitle}
            </Typography>
            <Typography variant="body1" className="trust-plane__card-body">
              {technicalEdge.fsmDescription}
            </Typography>
          </GlassCard>
        </motion.div>
      </SectionBlock>

      <SectionBlock id={pricing.sectionId} variant="methods" title={pricing.title} lead={pricing.lead}>
        <motion.div variants={sectionContainerVariants} initial="hidden" animate="show" className="trust-plane__grid trust-plane__grid--pricing">
          {pricing.tiers.map((tier) => (
            <GlassCard key={tier.id} variant="methods" className="trust-plane__card">
              <Typography variant="subtitle1" className="trust-plane__card-title">
                {tier.name}
              </Typography>
              <Typography variant="h2" className="trust-plane__price">
                {tier.price}
              </Typography>
              <Typography variant="body1" className="trust-plane__card-body">
                {tier.summary}
              </Typography>
            </GlassCard>
          ))}
        </motion.div>
        <Typography className="trust-plane__category-note" variant="body1">
          {pricing.bookingFeeModel}
        </Typography>
      </SectionBlock>

      <SectionBlock id={founder.sectionId} variant="methods" title={founder.title} lead={founder.lead}>
        <motion.div variants={sectionContainerVariants} initial="hidden" animate="show">
          <GlassCard variant="methods" className="trust-plane__card">
            <ul className="trust-plane__bullets">
              {founder.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </SectionBlock>

      <SectionBlock
        id={recommendedPages.sectionId}
        variant="methods"
        title={recommendedPages.title}
      >
        <motion.div variants={sectionContainerVariants} initial="hidden" animate="show" className="trust-plane__grid trust-plane__grid--recommended">
          {recommendedPages.pages.map((page) => (
            <GlassCard key={page.id} variant="methods" className="trust-plane__card">
              <Typography variant="subtitle1" className="trust-plane__card-title">
                {page.title}
              </Typography>
              <Typography variant="body1" className="trust-plane__card-body">
                {page.summary}
              </Typography>
              <ul className="trust-plane__bullets">
                {page.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </motion.div>
      </SectionBlock>
    </>
  );
};

export default TrustPlaneSections;
