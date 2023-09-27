import { PaletteColorOptions, ThemeOptions, PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {

  interface Theme {
    mode?: 'light' | 'dark';
   
  }

  interface ThemeOptions {
    mode?: 'light' | 'dark';
 
  }

  interface Palette {
    neutral: PaletteColorOptions;
    primary: PaletteColorOptions;
    background: PaletteColorOptions;
  }

  interface PaletteOptions {
  }

  interface PaletteColorOptions {
    dark: React.CSSProperties['color'],
    main: React.CSSProperties['color'],
    mediumMain?: React.CSSProperties['color'],
    medium?: React.CSSProperties['color'],
    light: React.CSSProperties['color'],
    moviesContainer?: React.CSSProperties['color'],
  }
  
} 