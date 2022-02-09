import * as React from 'react';
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Select, Result } from './Pages';
import { Error } from 'Components';
import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      background: string;
      backgroundCard: string;
    };
  }
  interface ThemeOptions {
    myPalette?: {
      background?: string;
      backgroundCard?: string;
    };
  }
}

export const MapContext = createContext<{
  map: any;
  setMap: React.Dispatch<(prevState: undefined) => undefined>;
}>({
  map: null,
  setMap: () => {},
});

function App() {
  const [map, setMap] = useState();
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
          backgroundCard: prefersDarkMode
            ? 'linear-gradient(to bottom, #434343, #000000)'
            : 'linear-gradient(to bottom, #e7767f, #ee9d8f99)',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <MapContext.Provider value={{ map, setMap }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:id" element={<Select />} />
            <Route path="/:id/result" element={<Result />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </MapContext.Provider>
  );
}
export default App;
