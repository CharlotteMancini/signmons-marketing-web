import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    surface: string;
  }

  interface Shape {
    radii: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      pill: string;
    };
  }

  interface ShapeOptions {
    radii?: Partial<Shape['radii']>;
  }
}
