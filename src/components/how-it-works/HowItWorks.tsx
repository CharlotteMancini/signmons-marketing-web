import { motion } from 'framer-motion';
import { homePageCopy } from '../../data';
import { sectionContainerVariants } from '../motion/presets';
import SectionBlock from '../ui/SectionBlock';
import FeatureListCard from '../ui/FeatureListCard';

const renderStepIllustration = (key: 'capture' | 'nurture' | 'secure' | 'follow-up' | 'dispatch') => {
  if (key === 'capture') {
    return (
      <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
        <rect x="26" y="86" width="86" height="54" rx="12" fill="rgba(120,190,255,0.14)" stroke="#8dcbff" strokeWidth="2.5" />
        <path d="M36 98h66M36 111h42M36 124h54" stroke="#bfe3ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M72 86l18-15 8 15" fill="none" stroke="#8dcbff" strokeWidth="2.5" />

        <rect x="124" y="34" width="72" height="112" rx="16" fill="rgba(22,86,156,0.34)" stroke="#98d7ff" strokeWidth="2.8" />
        <rect x="142" y="45" width="36" height="5" rx="2.5" fill="#c9ebff" opacity="0.9" />
        <path
          d="M150 87c2 7 7 11 13 14l5-5 6 2v8c0 2-1 3-3 3-16 0-30-13-30-30 0-2 1-3 3-3h8l2 6-4 5z"
          fill="#63d5ff"
        />
        <circle cx="160" cy="131" r="5" fill="#a7defd" />

        <rect x="208" y="78" width="86" height="62" rx="14" fill="rgba(96,212,189,0.14)" stroke="#79e6d0" strokeWidth="2.5" />
        <circle cx="226" cy="96" r="6" fill="#7df2da" />
        <path d="M240 95h38M240 108h30M240 121h46" stroke="#bdf8ec" strokeWidth="4" strokeLinecap="round" />
        <path d="M228 140l-8 14 22-10" fill="rgba(96,212,189,0.2)" stroke="#79e6d0" strokeWidth="2.2" />

        <path d="M112 102h12M196 102h12" stroke="#98d7ff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <path d="M96 112l18-8M206 104l18 8" stroke="#7fc9ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }

  if (key === 'nurture') {
    return (
      <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
        <rect x="58" y="54" width="150" height="74" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(160,204,255,0.4)" />
        <rect x="82" y="38" width="158" height="80" rx="16" fill="rgba(255,255,255,0.12)" stroke="rgba(173,220,255,0.55)" />
        <rect x="112" y="24" width="164" height="88" rx="18" fill="rgba(255,255,255,0.16)" stroke="rgba(185,228,255,0.7)" />
        <circle cx="136" cy="52" r="8" fill="#7af0e0" />
        <path d="M152 50h98M152 68h80M152 86h56" stroke="#d8edff" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      </svg>
    );
  }

  if (key === 'follow-up') {
    return (
      <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
        <rect x="36" y="26" width="86" height="56" rx="12" fill="rgba(110,188,255,0.16)" stroke="#8fd0ff" strokeWidth="2.2" />
        <path d="M46 46h54M46 60h42" stroke="#cbe9ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M122 54c28 0 36 20 36 36" fill="none" stroke="#82d7ff" strokeWidth="3.2" />
        <path d="M152 82l6 8 8-8" fill="none" stroke="#82d7ff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="162" y="92" width="120" height="48" rx="13" fill="rgba(110,241,203,0.16)" stroke="#7bead2" strokeWidth="2.2" />
        <path d="M174 110h66M174 122h48" stroke="#cbfff2" strokeWidth="4" strokeLinecap="round" />
        <circle cx="258" cy="116" r="12" fill="rgba(123,234,210,0.26)" stroke="#7bead2" strokeWidth="2.2" />
        <text x="258" y="120" textAnchor="middle" fill="#d8fff5" fontSize="10" fontWeight="700">
          SMS
        </text>
      </svg>
    );
  }

  if (key === 'dispatch') {
    return (
      <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
        <rect x="40" y="34" width="112" height="92" rx="14" fill="rgba(117,190,255,0.14)" stroke="#9dd8ff" strokeWidth="2.4" />
        <path d="M58 56h76M58 73h64M58 90h52" stroke="#ceebff" strokeWidth="4" strokeLinecap="round" />
        <circle cx="130" cy="106" r="10" fill="rgba(129,216,255,0.24)" stroke="#9dd8ff" strokeWidth="2.2" />
        <path d="M124 106l4 4 8-9" fill="none" stroke="#caf2ff" strokeWidth="2.6" strokeLinecap="round" />

        <path d="M152 82h28" stroke="#8eceff" strokeWidth="3" strokeLinecap="round" />
        <path d="M166 72l15 10-15 10" fill="none" stroke="#8eceff" strokeWidth="3" strokeLinecap="round" />

        <rect x="188" y="72" width="96" height="58" rx="16" fill="rgba(118,235,210,0.14)" stroke="#7ae7d0" strokeWidth="2.4" />
        <circle cx="216" cy="101" r="10" fill="rgba(122,231,208,0.24)" />
        <path d="M212 101h8M216 97v8" stroke="#d5fff6" strokeWidth="2" strokeLinecap="round" />
        <path d="M232 92h36M232 106h30" stroke="#cefff3" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="feature-list-card__illustration-svg" viewBox="0 0 320 170" role="presentation">
      <rect x="102" y="28" width="116" height="84" rx="18" fill="rgba(114,188,255,0.16)" stroke="rgba(149,217,255,0.85)" />
      <path d="M102 60h116M130 28v16M190 28v16" stroke="#bce7ff" strokeWidth="3" opacity="0.9" />
      <rect x="126" y="72" width="18" height="14" rx="3" fill="#8ae6ff" />
      <rect x="150" y="72" width="18" height="14" rx="3" fill="#8ae6ff" />
      <rect x="174" y="72" width="18" height="14" rx="3" fill="#8ae6ff" />
      <path d="M118 122h84" stroke="#ffd66b" strokeWidth="4" strokeLinecap="round" />
      <circle cx="232" cy="128" r="14" fill="rgba(102,221,191,0.2)" stroke="#68eac8" strokeWidth="3" />
      <path d="M226 128l4 4 8-10" stroke="#68eac8" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
};

const HowItWorks = () => {
  const { howItWorks } = homePageCopy;

  return (
    <SectionBlock
      id={howItWorks.sectionId}
      variant="methods"
      title={howItWorks.title}
      lead={howItWorks.lead}
    >
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="show"
        className="pipeline"
      >
        {howItWorks.steps.map((step) => (
          <FeatureListCard
            key={step.id}
            className="pipeline-step"
            title={step.title}
            description={step.description}
            caption={step.guardrail}
            illustration={renderStepIllustration(step.illustrationKey)}
          />
        ))}
      </motion.div>
    </SectionBlock>
  );
};

export default HowItWorks;
