import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ColaBab, Select, Result } from './Pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ColaBab />} />
        <Route path="/:id" element={<Select />} />
        <Route path="/:id/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
