import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Select, Result } from './Pages';
import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      background: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    myPalette?: {
      background?: string;
    };
  }
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        myPalette: {
          background: prefersDarkMode
            ? 'linear-gradient(to bottom, #434343, #000000)'
            : 'linear-gradient(to bottom, #d66d75, #e29587)',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Select />} />
          <Route path="/:id/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
