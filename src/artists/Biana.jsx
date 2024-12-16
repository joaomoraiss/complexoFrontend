import React from 'react';

const Biana = () => {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold underline mb-8">Biana</h1>
      <div className="flex flex-col items-center">
        <img src={require('../assets/casaalfaia/bianacasaalfaia.jpg').default} alt="Biana" className="w-48 h-48 rounded-full object-cover mb-4" />
        <p className="text-center text-lg font-semibold">Biana é uma artista talentosa...</p>
        {/* Adicione mais informações sobre a Biana aqui */}
      </div>
    </div>
  );
};

export default Biana;
