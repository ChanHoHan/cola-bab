const LightThemeColor = '#54aab5';
const DarkThemeColor = '#1b1b20';

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      background: string;
      backgroundCard: string;
      backgroundLoading: string;
      foreground: string;
      cloud: string;
    };
  }
  interface ThemeOptions {
    myPalette?: {
      background?: string;
      backgroundCard?: string;
      backgroundLoading: string;
      foreground: string;
      cloud?: string;
    };
  }
}

export const myPalette = {
  light: {
    background: '#e1eef0',
    backgroundCard: '#bfe5ec',
    backgroundLoading: '#e1eef0',
    foreground: '#222222',
    cloud: LightThemeColor,
  },
  dark: {
    background: DarkThemeColor,
    backgroundCard: DarkThemeColor,
    backgroundLoading: DarkThemeColor,
    foreground: '#ffffff',
    cloud: '#ffffff',
  },
};
