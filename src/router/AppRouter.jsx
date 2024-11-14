import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Nos from '../pages/Nos';
import JuntaSe from '../pages/JuntaSe';
import Contato from '../pages/Contato';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import CasaAlfaia from '../pages/CasaAlfaia'; // Importa a nova página
import Footer from '../components/Footer';

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
        <Route path="/iniciar-sessao" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/casa-alfaia" element={<CasaAlfaia />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;





