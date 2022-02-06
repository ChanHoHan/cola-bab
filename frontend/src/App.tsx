import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Select, Result } from './Pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Select />} />
        <Route path="/:id/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
