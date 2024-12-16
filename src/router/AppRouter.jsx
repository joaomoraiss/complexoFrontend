import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/HomePublic';
import Sobre from '../pages/Sobre';
import Nos from '../pages/Nos';
import JuntaSe from '../pages/JuntaSe';
import Contato from '../pages/Contato';
import Artists from '../pages/Artists';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import HomePrivate from '../pages/HomePrivate'; 
import CasaAlfaia from '../pages/CasaAlfaia';
import Footer from '../components/Footer';
import Alysson from '../artists/Alysson';
import Biana from '../artists/Biana';

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
        <Route path="/artistas" element={<Artists />} />
        <Route path="/iniciar-sessao" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home-private/:username" element={<HomePrivate />} /> 
        <Route path="/casa-alfaia" element={<CasaAlfaia />} />  
        <Route path="../artists/alysson" element={<Alysson />} />
        <Route path="../artists/biana" element={<Biana />} />      
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;







