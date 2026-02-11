import type { CSSProperties, ReactNode } from 'react';
import { borders, colors, effects, radii, shadows, spacing, typography } from '../design/tokens';

type MarketingLayoutProps = {
  children: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
};

const MarketingLayout = ({ children, headerSlot, footerSlot }: MarketingLayoutProps) => {
  return (
    <div
      className="marketing-root"
      style={{
        '--color-bg-page': colors.bg.page,
        '--color-bg-card': colors.bg.card,
        '--color-bg-surface': colors.bg.surface,
        '--color-text-primary': colors.text.primary,
        '--color-text-secondary': colors.text.secondary,
        '--color-text-muted': colors.text.muted,
        '--color-border-subtle': colors.border.subtle,
        '--color-brand-primary': colors.brand.primary,
        '--color-brand-secondary': colors.brand.secondary,
        '--color-brand-accent': colors.brand.accent,
        '--color-brand-highlight': colors.brand.highlight,
        '--color-neutral-white': colors.neutral.white,
        '--font-family': typography.fontFamily,
        '--font-hero-size': typography.hero.fontSize,
        '--font-hero-weight': typography.hero.fontWeight,
        '--font-hero-spacing': typography.hero.letterSpacing,
        '--font-hero-line': typography.hero.lineHeight,
        '--font-lead-size': typography.lead.fontSize,
        '--font-lead-weight': typography.lead.fontWeight,
        '--font-lead-spacing': typography.lead.letterSpacing,
        '--font-lead-line': typography.lead.lineHeight,
        '--font-section-size': typography.sectionTitle.fontSize,
        '--font-section-weight': typography.sectionTitle.fontWeight,
        '--font-section-spacing': typography.sectionTitle.letterSpacing,
        '--font-section-line': typography.sectionTitle.lineHeight,
        '--font-body-size': typography.body.fontSize,
        '--font-body-weight': typography.body.fontWeight,
        '--font-body-line': typography.body.lineHeight,
        '--font-caption-size': typography.caption.fontSize,
        '--font-caption-weight': typography.caption.fontWeight,
        '--font-caption-line': typography.caption.lineHeight,
        '--font-cta-size': typography.cta.fontSize,
        '--font-cta-weight': typography.cta.fontWeight,
        '--font-cta-spacing': typography.cta.letterSpacing,
        '--space-xxs': spacing.xxs,
        '--space-xs': spacing.xs,
        '--space-sm': spacing.sm,
        '--space-md': spacing.md,
        '--space-lg': spacing.lg,
        '--space-xl': spacing.xl,
        '--space-2xl': spacing['2xl'],
        '--space-3xl': spacing['3xl'],
        '--space-4xl': spacing['4xl'],
        '--space-5xl': spacing['5xl'],
        '--radius-sm': radii.sm,
        '--radius-md': radii.md,
        '--radius-lg': radii.lg,
        '--radius-xl': radii.xl,
        '--radius-pill': radii.pill,
        '--effect-glow-primary': effects.glowPrimary,
        '--effect-glow-secondary': effects.glowSecondary,
        '--effect-glow-pink': effects.glowPink,
        '--effect-glass-soft': effects.glassSoft,
        '--effect-glass': effects.glass,
        '--effect-glass-strong': effects.glassStrong,
        '--effect-glass-tint': effects.glassTint,
        '--effect-star': effects.star,
        '--effect-star-soft': effects.starSoft,
        '--shadow-title': shadows.title,
        '--shadow-primary-cta': shadows.primaryCta,
        '--shadow-step-icon': shadows.stepIcon,
        '--shadow-orb-primary': shadows.orbPrimary,
        '--shadow-orb-secondary': shadows.orbSecondary,
        '--shadow-panel': shadows.panel,
        '--shadow-inset': shadows.inset,
        '--border-halo': borders.halo,
      } as CSSProperties}
    >
      <div className="marketing-bg-overlay" aria-hidden="true" />
      <div className="star-orbs" aria-hidden="true">
        <span className="shooting-star shooting-star--one" />
        <span className="shooting-star shooting-star--two" />
      </div>
      {headerSlot ? <header className="marketing-header">{headerSlot}</header> : null}
      <div className="marketing-shell">
        {children}
      </div>
      {footerSlot ? <div>{footerSlot}</div> : null}
    </div>
  );
};

export default MarketingLayout;
