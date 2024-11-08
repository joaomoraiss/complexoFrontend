
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Nos from '../pages/Nos';
import JuntaSe from '../pages/JuntaSe';
import Contato from '../pages/Contato';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/nos" element={<Nos />} />
        <Route path="/junta-se" element={<JuntaSe />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;


