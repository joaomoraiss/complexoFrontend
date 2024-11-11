// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/teste1.jpg';

// Importando a fonte Exo diretamente no componente
const fontExo = `
  @import url('https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,200&display=swap');
`;

const Home = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setShowText(true);
      } else {
        setShowText(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <style>{fontExo}</style> {/* Adicionando o @import da fonte Exo apenas neste componente */}
      
      {/* Imagem de fundo */}
      <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
        <img 
          src={backgroundImage} 
          alt="Estúdio de tatuagem" 
          className="object-cover w-full h-full"
        />
        
        {/* Texto e botão sobre a imagem */}
        <div
          className={`absolute text-center text-white transition-opacity duration-700 ${showText ? 'opacity-100' : 'opacity-0'}`}
          style={{ top: '62%', left: '50%', transform: 'translate(-50%, -30%)' }}
        >
          {/* Primeira parte do texto */}
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-light"
            style={{
              fontFamily: "'Exo', sans-serif",
              fontWeight: 200, // ExtraLight 100
              transition: 'opacity 1s ease-in-out',
              opacity: showText ? 1 : 0,
            }}
          >
            Tatuagem, arte e cultura visual:
          </h1>
          
          {/* Segunda parte do texto */}
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-light mt-2"
            style={{
              fontFamily: "'Exo', sans-serif",
              fontWeight: 100,
              transition: 'opacity 1s ease-in-out 1s', // Delay de 1 segundo para aparecer depois
              opacity: showText ? 1 : 0,
            }}
          >
            tudo em um só lugar.
          </h2>

          <button className="mt-4 px-6 py-3 bg-black bg-opacity-70 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
            Saiba mais
          </button>
        </div>
      </div>

      {/* Conteúdo abaixo da imagem */}
      <div className="px-4 py-8">
        <h1>Home Page</h1>
        <p>Bem-vindo à página inicial.</p>
      </div>
    </div>
  );
};

export default Home;

