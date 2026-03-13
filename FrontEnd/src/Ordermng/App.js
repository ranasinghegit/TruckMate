import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Interface1 from './Interface1';
import Interface2 from './Interface2';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Interface1 />} />
        <Route path="/Interface2" element={<Interface2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
