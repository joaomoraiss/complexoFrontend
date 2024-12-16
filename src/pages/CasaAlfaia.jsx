import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import CasaAlfaia1 from '../assets/casaalfaia/CasaAlfaia1.png';
import CasaAlfaia2 from '../assets/casaalfaia/CasaAlfaia2.jpg';
import CasaAlfaia3 from '../assets/casaalfaia/CasaAlfaia3.jpeg';

import alysson from '../assets/casaalfaia/alyssoncasaalfaia.jpg';
import biana from '../assets/casaalfaia/bianacasaalfaia.jpg';
import cisco from '../assets/casaalfaia/ciscocasaalfaia.jpg';
import diniz from '../assets/casaalfaia/dinizcasaalfaia.jpg';
import emanoel from '../assets/casaalfaia/emanoelcasaalfaia.jpg';
import johnny from '../assets/casaalfaia/johnnycasaalfaia.jpg';
import kim from '../assets/casaalfaia/kimcasaalfaia.jpg';
import lucile from '../assets/casaalfaia/lucilecasaalfaia.jpg';
import matrizb from '../assets/casaalfaia/matrizbcasaalfaia.jpg';

const CasaAlfaia = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const artists = [
    { name: 'Alysson', image: alysson },
    { name: 'Biana', image: biana },
    { name: 'Cisco', image: cisco },
    { name: 'Diniz', image: diniz },
    { name: 'Emanoel', image: emanoel },
    { name: 'Johnny', image: johnny },
    { name: 'Kim', image: kim },
    { name: 'Lucile', image: lucile },
    { name: 'MatrizB', image: matrizb }
  ];

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 }
  };

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 z-10"
      style={{ fontSize: '2rem' }}
    >
      &#8249;
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 z-10"
      style={{ fontSize: '2rem' }}
    >
      &#8250;
    </button>
  );

  return (
    <div className="container mx-auto px-8 py-12">
  
  <div className="flex items-center mb-4 space-x-6">
    <h1 className="text-3xl font-bold underline">CASA ALFAIA</h1>
    <p className="text-lg underline ml-8 flex items-center">
      contato:
      <a href="#" className="text-2xl text-gray-600 hover:text-black ml-2">
        <FaInstagram />
      </a>
    </p>
  </div>

      
      <div className="flex flex-col items-start md:flex-row md:justify-between mb-16">
        <div className="md:w-1/2 text-sm mb-4 md:mb-0">
          <p>
            Localizada no Recife Antigo, o espaço da Casa Alfaia contribui não só no acolhimento de tatuadores residentes e convidados, mas também promove eventos multiartísticos abertos, tornando o convívio com os artistas da Casa Alfaia mais único. Você pode acompanhar de perto e conhecer um pouco mais dos trabalhos e profissionais desse lugar.
          </p>
          <div className="mt-4">
            <Link to="/mais-informacoes" className="underline font-bold text-lg">MAIS INFORMAÇÕES</Link>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt className="mr-2" />
              <Link to="/como-chegar" className="text-sm">como chegar</Link>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 md:w-1/2">
          <img src={CasaAlfaia1} alt="Casa Alfaia 1" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src={CasaAlfaia2} alt="Casa Alfaia 2" className="w-1/3 h-48 object-cover rounded-lg" />
          <img src={CasaAlfaia3} alt="Casa Alfaia 3" className="w-1/3 h-48 object-cover rounded-lg" />
        </div>
      </div>

      
      <h2 className="text-2xl font-bold text-center mt-16 mb-4">ARTISTAS</h2>
      <div className="bg-gray-200 p-4 rounded-lg relative">
        <Carousel
          responsive={responsive}
          infinite={false}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {artists.map((artist, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={artist.image} alt={artist.name} className="w-24 h-24 rounded-full object-cover" />
              <p className="text-center mt-2">{/*{artist.name}*/}
              <Link to={`/artists/${artist.name}`} className="hover:underline">
                  {artist.name}
                </Link>
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Avaliações */}
      <h2 className="text-2xl font-bold mt-10 mb-4">AVALIAÇÕES</h2>
      <p className="text-gray-600 mb-4">Se você tem algo para falar desse espaço, deixe a sua avaliação aqui.</p>

      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Formulário de Avaliação */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <form className="p-4 border border-gray-400 rounded-lg">
            <div className="flex space-x-4 mb-4">
              <input type="text" placeholder="nome:" className="w-full p-2 border border-gray-300 rounded" />
              <input type="email" placeholder="e-mail:" className="w-full p-2 border border-gray-300 rounded" />
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className="focus:outline-none"
                  >
                    {star <= rating ? (
                      <AiFillStar className="text-yellow-500 text-2xl" />
                    ) : (
                      <AiOutlineStar className="text-gray-400 text-2xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <textarea placeholder="avaliação:" className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
            <button type="submit" className="w-full p-2 bg-gray-800 text-white rounded-lg">ENVIAR</button>
          </form>
        </div>

        {/* Cartões de Avaliação */}
        <div className="flex space-x-4 md:w-1/2">
          <div className="p-4 border border-gray-300 rounded-lg w-1/2">
            <p className="font-bold">CÉU DO NASCIMENTO</p>
            <p className="text-yellow-500">★★★★★</p>
            <p>Ambiente ótimo, espaço acessível e receptivo. Adorei!</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg w-1/2">
            <p className="font-bold">JÚLIA OLIVEIRA SANTINO</p>
            <p className="text-yellow-500">★★★★★</p>
            <p>Amei! Pretendo voltar mais vezes.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg w-1/2">
            <p className="font-bold">CAIO DUTRA</p>
            <p className="text-yellow-500">★★★★★</p>
            <p>Perfeito! Ótimos profissionais e espaço.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasaAlfaia;

