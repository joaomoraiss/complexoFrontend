// src/pages/Contato.jsx
import React from 'react';
import contatoBgImg from '../assets/contatoIMG.png'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Contato = () => {
  return (
    <section>
    <div
      className="w-full bg-cover bg-center sm:h-[300px] phone:h-[200px]"
      style={{ backgroundImage: `url(${contatoBgImg})`,
     }}
    ></div>
    <div className='mt-10 ml-10'>
     <h1 className='phone:text-3xl md:text-4xl'>Contato:</h1>
     <p className='text-gray-500'>Se quiser falar com a gente é por aqui, tá?!</p>
     <p className='mt-5 mb-1'>comercial@complexo.com.br</p>
     <p>(81)-94444-4444</p>
     <div className='flex gap-3 mt-1'>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-black text-2xl hover:text-gray-700" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-black text-2xl hover:text-gray-700" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-black text-2xl hover:text-gray-700" />
        </a>
      </div>
    </div>
    </section>
  );
};

export default Contato;
