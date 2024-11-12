// src/components/Carousel.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const studios = [
  { name: 'Arte Tattoo', image: '/path/to/image1.jpg' },
  { name: 'Casa Alfaia', image: '/path/to/image2.jpg' },
  { name: 'Estúdio XYZ', image: '/path/to/image3.jpg' },
  // Adicione mais estúdios conforme necessário
];

// Setas Personalizadas
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-[-25px] transform -translate-y-1/2 cursor-pointer text-3xl text-gray-600 hover:text-gray-800"
      style={{ zIndex: 2 }}
    >
      &#8250; {/* Seta para a direita */}
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-[-25px] transform -translate-y-1/2 cursor-pointer text-3xl text-gray-600 hover:text-gray-800"
      style={{ zIndex: 2 }}
    >
      &#8249; {/* Seta para a esquerda */}
    </div>
  );
};

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "10px", // Ajuste para controlar o espaço nas bordas do carrossel
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-8 lg:px-16">
      <h2 className="text-center text-xl font-bold mb-6">ESTÚDIOS</h2>
      <div className="relative">
        <Slider {...settings}>
          {studios.map((studio, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <img
                src={studio.image}
                alt={studio.name}
                className="w-40 h-40 object-cover rounded-lg shadow-lg"
              />
              <p className="mt-2 text-lg font-medium">{studio.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;



