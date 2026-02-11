import '@mui/material/styles/createPalette';
import '@mui/system/createTheme/shape';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    surface: string;
  }
}

declare module '@mui/system/createTheme/shape' {
  interface Shape {
    radii: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      pill: string;
    };
  }
}

export {};
