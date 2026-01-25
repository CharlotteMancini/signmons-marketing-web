import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, radii } from './tokens';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.brand.primary,
    },
    secondary: {
      main: colors.brand.accent,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    background: {
      default: colors.bg.page,
      paper: colors.bg.card,
    },
    divider: colors.border.subtle,
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
    },
    body1: {
      fontSize: typography.body.fontSize,
      fontWeight: typography.body.fontWeight,
      lineHeight: typography.body.lineHeight,
    },
    caption: {
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
    },
    button: {
      fontSize: typography.cta.fontSize,
      fontWeight: typography.cta.fontWeight,
      letterSpacing: typography.cta.letterSpacing,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: parseInt(radii.md, 10),
  },

  spacing: (factor: number) => {
    const map = [
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
    return map[factor] ?? spacing.md;
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radii.pill,
        },
      },
    },
  },
});
