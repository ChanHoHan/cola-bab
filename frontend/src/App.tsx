import * as React from 'react';
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Select, Result } from './Pages';
import { Error } from 'Components';
import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { myPalette } from 'theme/myPalette';
import CssBaseline from '@mui/material/CssBaseline';

export const MapContext = createContext<{
  map: any;
  curLocation: any;
  setMap: React.Dispatch<(prevState: undefined) => undefined>;
  setCurLocation: React.Dispatch<(prevState: any) => any>;
}>({
  map: null,
  curLocation: null,
  setMap: () => {},
  setCurLocation: () => {},
});

function App() {
  const [map, setMap] = useState();
  const [curLocation, setCurLocation] = useState();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        myPalette: prefersDarkMode ? myPalette.dark : myPalette.light,
      }),
    [prefersDarkMode]
  );

  return (
    <MapContext.Provider value={{ map, curLocation, setMap, setCurLocation }}>
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

// {
//   background: prefersDarkMode ? '#1b1b20' : '#ffffff',
//   backgroundCard: prefersDarkMode ? '#1b1b20' : '#ffffff',
//   cloud: prefersDarkMode ? '#ffffff' : '#000000',
// },
