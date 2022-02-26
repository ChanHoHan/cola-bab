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
    background: '#ffffff',
    backgroundCard: '#ffffff',
    cloud: '#000000',
  },
  dark: {
    background: '#1b1b20',
    backgroundCard: '#1b1b20',
    cloud: '#ffffff',
  },
};
