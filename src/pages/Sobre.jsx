// src/pages/Sobre.jsx
import React from 'react';
import logo from '../assets/logoComplexo.png';

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">
      <img src={logo} alt="Complexo Logo" className="w-48 h-auto mb-8" /> 
      <div className="max-w-3xl text-black text-base leading-relaxed"> 
        <p className="mb-6 text-black font-medium text-justify">
          O Complexo é uma plataforma dedicada a reunir e dar visibilidade aos estúdios de tatuagem ao longo do Recife,
          oferecendo um espaço exclusivo e focado para os profissionais do ramo. Nosso objetivo é criar uma vitrine para os
          artistas residentes desses estúdios, permitindo que seus trabalhos sejam destacados em um ambiente especializado,
          sem o risco de se perderem em meio ao excesso de conteúdos de outras redes sociais. Aqui, tatuadores e clientes
          encontram um espaço colaborativo que também serve como portfólio digital.
        </p>
        <p className="mb-6 text-black font-medium text-justify">
          Além disso, o Complexo vai além de um simples catálogo. Ele também conecta pessoas interessadas em arte com um
          universo mais amplo, já que muitos estúdios e seus artistas trabalham com diversas formas de expressão visual, como
          pintura, ilustração e arte urbana. Ao fomentar essa conexão, buscamos fortalecer a cultura local e criar um espaço
          onde arte e tatuagem se encontram de maneira única.
        </p>
        <p className="mb-10 text-black font-medium text-justify">
          Se você está procurando um estúdio para se tatuar, o Complexo oferece uma visão ampla de diferentes estilos e
          trabalhos realizados por artistas talentosos de Recife. Para tatuadores visitantes, é a oportunidade perfeita de
          explorar os estúdios locais e identificar novas possibilidades de colaboração e trabalho.
        </p>
        <p className="mb-20 font-semibold text-black text-center">
          Junte-se a nós e descubra o que a cena de tatuagem do Recife tem a oferecer!
        </p>
      </div>
    </div>
  );
};

export default Sobre;

