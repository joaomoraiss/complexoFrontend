
import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-4 text-center flex flex-col items-center">
      <p className="text-sm">
        &copy; 2024 by Complexo
      </p>
      <p className="text-sm mt-1">
        contato: <a href="mailto:comercial@complexo.com.br" className="underline">comercial@complexo.com.br</a>
      </p>
      <p className="text-sm mt-1">
        <a href="/termos" className="hover:underline">termos e condições</a>
      </p>
      <div className="flex space-x-4 mt-3">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white text-2xl hover:text-gray-300" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white text-2xl hover:text-gray-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white text-2xl hover:text-gray-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
