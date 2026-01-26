import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, radii } from './tokens';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      white: colors.neutral.white,
    },
    primary: {
      main: colors.brand.primary,
    },
    secondary: {
      main: colors.brand.secondary,
    },
    info: {
      main: colors.brand.accent,
    },
    error: {
      main: colors.brand.highlight,
    },
    success: {
      main: colors.state.confirmed,
    },
    warning: {
      main: colors.state.candidate,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.muted,
    },
    background: {
      default: colors.bg.page,
      paper: colors.bg.card,
      surface: colors.bg.surface,
    },
    divider: colors.border.subtle,
    action: {
      disabled: colors.state.disabled,
    },
  },

  typography: {
    fontFamily: typography.fontFamily,

    h1: {
      fontSize: typography.hero.fontSize,
      fontWeight: typography.hero.fontWeight,
      letterSpacing: typography.hero.letterSpacing,
      lineHeight: typography.hero.lineHeight,
    },
    h2: {
      fontSize: typography.sectionTitle.fontSize,
      fontWeight: typography.sectionTitle.fontWeight,
      letterSpacing: typography.sectionTitle.letterSpacing,
      lineHeight: typography.sectionTitle.lineHeight,
    },
    subtitle1: {
      fontSize: typography.lead.fontSize,
      fontWeight: typography.lead.fontWeight,
      letterSpacing: typography.lead.letterSpacing,
      lineHeight: typography.lead.lineHeight,
    },
    body1: {
      fontSize: typography.body.fontSize,
      fontWeight: typography.body.fontWeight,
      lineHeight: typography.body.lineHeight,
    },
    body2: {
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
      lineHeight: typography.caption.lineHeight,
    },
    caption: {
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
      lineHeight: typography.caption.lineHeight,
    },
    button: {
      fontSize: typography.cta.fontSize,
      fontWeight: typography.cta.fontWeight,
      letterSpacing: typography.cta.letterSpacing,
      textTransform: 'none',
      lineHeight: 1.2,
    },
  },

  shape: {
    borderRadius: parseInt(radii.md, 10),
    radii,
  },

  spacing: (factor: number) => {
    const map = [
      '0px',
      spacing.xxs,
      spacing.xs,
      spacing.sm,
      spacing.md,
      spacing.lg,
      spacing.xl,
      spacing['2xl'],
      spacing['3xl'],
      spacing['4xl'],
      spacing['5xl'],
    ];
    if (factor < 0) return '0px';
    return map[factor] ?? map[map.length - 1];
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radii.pill,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
