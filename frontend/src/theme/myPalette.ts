const LightThemeColor = '#54aab5';
const DarkThemeColor = '#1b1b20';

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      background: string;
      backgroundCard: string;
      cloud: string;
    };
  }
  interface ThemeOptions {
    myPalette?: {
      background?: string;
      backgroundCard?: string;
      cloud?: string;
    };
  }
}

export const myPalette = {
  light: {
    background: LightThemeColor + '33',
    backgroundCard: '#bfe5ec',

    cloud: LightThemeColor,
  },
  dark: {
    background: DarkThemeColor,
    backgroundCard: DarkThemeColor,
    cloud: '#ffffff',
  },
};
