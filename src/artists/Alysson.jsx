import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Alysson = () => {
  const navigate = useNavigate(); 


  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold underline mb-8">Alysson</h1>
      <div className="flex flex-col items-center">
        <img src={require('../assets/casaalfaia/alyssoncasaalfaia.jpg').default} alt="Alysson" className="w-48 h-48 rounded-full object-cover mb-4" />
        <p className="text-center text-lg font-semibold">Alysson é um artista talentoso...</p>
        {/* Adicione mais informações sobre o Alysson aqui */}
      </div>
    </div>
  );
};

export default Alysson;
