export const colors = {
  brand: {
    primary: '#7A5CE6',
    secondary: '#17EAD9',
    accent: '#49C6FF',
    highlight: '#FF37C7',
  },
  neutral: {
    white: '#FFFFFF',
  },
  state: {
    confirmed: '#2ED573',
    candidate: '#FFD166',
    disabled: '#5B6577',
  },
  text: {
    primary: '#F5F7FF',
    secondary: '#C7D0E1',
    muted: '#98A3B8',
  },
  bg: {
    page: '#080C12',
    card: '#101827',
    surface: '#0E1420',
  },
  border: {
    subtle: '#1E2A3D',
  },
};

export const typography = {
  fontFamily: '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  hero: {
    fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    lineHeight: 1.2,
  },
  lead: {
    fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
    fontWeight: 500,
    letterSpacing: '-0.005em',
    lineHeight: 1.55,
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
  },
  body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.7 },
  caption: { fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.6 },
  cta: { fontSize: '1rem', fontWeight: 700, letterSpacing: '0.01em' },
};

export const spacing = {
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
  '5xl': '6rem',
};

export const radii = {
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  pill: '999px',
};

export const effects = {
  glowPrimary: 'rgba(122, 92, 230, 0.45)',
  glowSecondary: 'rgba(73, 198, 255, 0.35)',
  glowPink: 'rgba(255, 55, 199, 0.3)',
  glassSoft: 'rgba(255, 255, 255, 0.12)',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassStrong: 'rgba(255, 255, 255, 0.16)',
  glassTint: 'rgba(122, 92, 230, 0.15)',
  star: 'rgba(255, 255, 255, 0.7)',
  starSoft: 'rgba(255, 255, 255, 0.35)',
};

export const shadows = {
  title: '0 10px 30px rgba(7, 6, 30, 0.6)',
  primaryCta: '0 16px 30px rgba(122, 92, 230, 0.35)',
  stepIcon: '0 12px 30px rgba(122, 92, 230, 0.35)',
  orbPrimary: '0 30px 80px rgba(122, 92, 230, 0.55)',
  orbSecondary: '0 0 60px rgba(73, 198, 255, 0.4)',
  panel: '0 24px 60px rgba(10, 8, 40, 0.45)',
  inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
};

export const borders = {
  halo: '2px solid rgba(255, 255, 255, 0.35)',
};

export const badges = {
  confirmed: {
    background: 'rgba(46, 213, 115, 0.16)',
    text: colors.state.confirmed,
    border: 'rgba(46, 213, 115, 0.4)',
  },
  candidate: {
    background: 'rgba(255, 209, 102, 0.16)',
    text: colors.state.candidate,
    border: 'rgba(255, 209, 102, 0.4)',
  },
  disabled: {
    background: 'rgba(91, 101, 119, 0.16)',
    text: colors.state.disabled,
    border: 'rgba(91, 101, 119, 0.4)',
  },
};

export const motion = {
  duration: {
    fast: '150ms',
    standard: '250ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
  },
};
