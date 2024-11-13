
import React from 'react';
import contatoBgImg from '../assets/contatoIMG.png';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Contato = () => {
  return (
    <section>
      <div
        className="w-full bg-cover bg-center sm:h-[300px] phone:h-[200px]"
        style={{ backgroundImage: `url(${contatoBgImg})` }}
      ></div>
      <div className="mt-10 flex flex-col items-center text-center">
        <h1 className="phone:text-3xl md:text-4xl">Contato:</h1>
        <p className="text-gray-500">Se quiser falar com a gente é por aqui, tá?!</p>
        <p className="mt-5 mb-1">comercial@complexo.com.br</p>
        <p>(81)-94444-4444</p>
      </div>
    </section>
  );
};

export default Contato;

