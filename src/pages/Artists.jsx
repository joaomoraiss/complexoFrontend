import React from "react";


import alysson from '../assets/casaalfaia/alyssoncasaalfaia.jpg';
import biana from '../assets/casaalfaia/bianacasaalfaia.jpg';
import cisco from '../assets/casaalfaia/ciscocasaalfaia.jpg';
import diniz from '../assets/casaalfaia/dinizcasaalfaia.jpg';
import emanoel from '../assets/casaalfaia/emanoelcasaalfaia.jpg';

const Artistas = () => {
  const artists = [
    { 
      name: 'Alysson', 
      image: alysson, 
      studio: 'Casa Alfaia', 
      artType: 'Tatuagem Realista', 
      summary: 'Alysson é um artista renomado especializado em tatuagens realistas. Seu trabalho é conhecido pela precisão e pelos detalhes impressionantes.' 
    },
    { 
      name: 'Biana', 
      image: biana, 
      studio: 'Casa Alfaia', 
      artType: 'Aquarela', 
      summary: 'Biana utiliza técnicas de aquarela para criar tatuagens vibrantes e cheias de vida. Ela é reconhecida por sua criatividade e inovação.' 
    },
    { 
      name: 'Cisco', 
      image: cisco, 
      studio: 'Casa Alfaia', 
      artType: 'Old School', 
      summary: 'Cisco é um especialista em tatuagens Old School. Seus trabalhos são marcados por linhas fortes e cores sólidas.' 
    },
    { 
      name: 'Diniz', 
      image: diniz, 
      studio: 'Casa Alfaia', 
      artType: 'Geométrico', 
      summary: 'Diniz cria tatuagens geométricas que combinam formas e padrões intricados. Seu estilo é moderno e minimalista.' 
    },
    { 
      name: 'Emanoel', 
      image: emanoel, 
      studio: 'Casa Alfaia', 
      artType: 'Tribal', 
      summary: 'Emanoel é conhecido por suas tatuagens tribais, que refletem uma profunda conexão com as tradições culturais.' 
    }
  ];

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="border border-gray-300 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Pesquise pelo artista</h2>
        
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Pesquise o nome do artista"
            className="w-full px-4 py-3 border-b border-gray-400 bg-gray-100 text-gray-700 focus:outline-none"
          />
          <button className="bg-gray-500 text-white px-8 py-3 ml-2 shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Nova seção fora da div de pesquisa */}
      <div>
        <h1 className="text-lg font-semibold text-gray-600 mt-6 mb-4">Artistas mais procurados</h1>
        <div className="grid grid-cols-1 gap-8">
          {artists.map((artist) => (
            <div key={artist.name} className="flex flex-col items-start p-4">
              <img src={artist.image} alt={artist.name} className="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">{artist.name}</h3>
              <p className="text-gray-500 mb-2"><strong>Estúdio:</strong> {artist.studio}</p>
              <p className="text-gray-500 mb-2"><strong>Tipo de Arte:</strong> {artist.artType}</p>
              <p className="text-gray-500 mb-2"><strong>Resumo:</strong> {artist.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistas;
