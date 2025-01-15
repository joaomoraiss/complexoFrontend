import React from "react";


import alysson from '../assets/casaalfaia/alyssoncasaalfaia.jpg';
import biana from '../assets/casaalfaia/bianacasaalfaia.jpg';
import cisco from '../assets/casaalfaia/ciscocasaalfaia.jpg';
import diniz from '../assets/casaalfaia/dinizcasaalfaia.jpg';
import emanoel from '../assets/casaalfaia/emanoelcasaalfaia.jpg';

const Artistas = () => {
  const artists = [
    { 
      name: 'Alysson Andrade', 
      image: alysson, 
      studio: 'Casa Alfaia', 
      artType: 'Tatuagem Realista', 
      summary: 'Olá, eu sou Alysson, um tatuador especializado em arte realista. Dedico-me a capturar a essência e os detalhes minuciosos de cada imagem que transformo em tatuagem. Meu trabalho é conhecido pela precisão e pelo incrível nível de detalhe que trago a cada peça. Acredito que cada tatuagem deve contar uma história e refletir a individualidade do cliente, por isso, invisto tempo para entender suas ideias e transformá-las em arte duradoura.' 
    },
    { 
      name: 'Biana Borges', 
      image: biana, 
      studio: 'Casa Alfaia', 
      artType: 'Aquarela', 
      summary: 'Eu sou Biana, tatuadora na Casa Alfaia, especializada em tatuagens minimalistas. Minha paixão é criar designs simples, mas significativos, que capturam a essência de uma ideia com linhas limpas e detalhes sutis. Para mim, menos é mais, e cada tatuagem deve ser uma expressão elegante e discreta do que é importante para o cliente. Amo trabalhar em colaboração com meus clientes para garantir que cada peça seja única e personalizada.' 
    },
    { 
      name: 'Cisco Costa', 
      image: cisco, 
      studio: 'Casa Alfaia', 
      artType: 'Old School', 
      summary: 'Cisco aqui! Eu me especializo em tatuagens neo-tradicionais, um estilo que combina o clássico e o moderno com cores vibrantes e linhas ousadas. Meu trabalho é uma fusão de tradição e inovação, sempre buscando trazer um toque contemporâneo a temas tradicionais. A cada tatuagem, meu objetivo é criar uma peça de arte impactante e cheia de vida que ressoe profundamente com quem a usa.' 
    },
    { 
      name: 'Diniz Dantas', 
      image: diniz, 
      studio: 'Casa Alfaia', 
      artType: 'Geométrico', 
      summary: 'Oi, sou Diniz, e minha especialidade é a tatuagem geométrica. Adoro explorar formas e padrões, criando designs que são tanto esteticamente agradáveis quanto profundamente significativos. Cada linha, ângulo e forma que tatuo é pensado meticulosamente para se alinhar com a harmonia do corpo. Meu objetivo é criar peças que sejam não apenas belas, mas também cheias de significado para cada cliente.' 
    },
    { 
      name: 'Emanoel Estevão', 
      image: emanoel, 
      studio: 'Casa Alfaia', 
      artType: 'Tribal', 
      summary: 'Eu sou Emanoel, um tatuador surrealista. Minha arte é um mergulho profundo no mundo dos sonhos e da imaginação, criando tatuagens que desafiam a realidade e provocam a mente. Adoro transformar ideias abstratas em imagens visuais únicas e intrigantes. Cada tatuagem que faço é uma jornada artística para o desconhecido, buscando sempre criar algo totalmente novo e pessoal.' 
    }
  ];

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="border border-gray-300 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Pesquise por artista ou tipo de arte</h2>
        
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Pesquise o nome do artista ou arte"
            className="w-full px-4 py-3 border-b border-gray-400 bg-gray-100 text-gray-700 focus:outline-none"
          />
          <button className="bg-gray-500 text-white px-8 py-3 ml-2 shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out">
            Pesquisar
          </button>
        </div>
      </div>

      {/* Nova secção fora da div de pesquisa */}
      <div>
        <h1 className="text-lg font-semibold text-gray-600 mt-6 mb-4">Artistas mais procurados</h1>
        <div className="grid grid-cols-1 gap-8">
          {artists.map((artist) => (
            <div key={artist.name} className="flex flex-col items-start p-4">
              <img src={artist.image} alt={artist.name} className="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2"><strong>{artist.name}</strong> </h3>
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
