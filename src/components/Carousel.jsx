// src/components/Carousel.jsx
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Importando as imagens diretamente
import CasaAlfaiaLogo from '../assets/Casa Alfaia Logo.jpg';
import CanoaLogo from '../assets/canoa_logo.png';
import BorcelleLogo from '../assets/borcelle_logo.png';

const studios = [
  { name: 'Canoa Studio', image: CanoaLogo }, // Usando a imagem Canoa Logo
  { name: 'Casa Alfaia', image: CasaAlfaiaLogo }, // Usando a imagem Casa Alfaia Logo
  { name: 'Borcelle Studio', image: BorcelleLogo }, // Usando a imagem Borcelle Logo
  // Adicione mais estúdios conforme necessário
];

// Setas personalizadas
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
      style={{ fontSize: '2.5rem' }} // Aumente o valor para ajustar o tamanho da seta
    >
      &#8249;
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
      style={{ fontSize: '2.5rem' }} // Aumente o valor para ajustar o tamanho da seta
    >
      &#8250;
    </button>
  );
};

const CarouselComponent = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-8 lg:px-16">
      <h2 className="text-center text-xl font-bold mb-6">ESTÚDIOS</h2>
      <Carousel
        responsive={responsive}
        infinite
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        containerClass="relative"
        itemClass="flex justify-center p-4"
      >
        {studios.map((studio, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={studio.image}
              alt={studio.name}
              className="w-40 h-40 object-cover rounded-lg shadow-lg"
            />
            <p className="mt-2 text-lg font-medium">{studio.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;



