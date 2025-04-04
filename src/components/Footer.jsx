// src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaTypo3 } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 mt-20 text-center flex flex-col items-center">
      <p className="text-sm">&copy; 2024 by Complexo</p>
      <p className="text-sm mt-1">
        contato:{" "}
        <a href="mailto:comercial@complexo.com.br" className="underline">
          comercial@complexo.com.br
        </a>
      </p>
      <p className="text-sm mt-1">
        <a href="/termos" className="hover:underline">
          termos e condições
        </a>
      </p>
      <div className="flex space-x-4 mt-3">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-black text-2xl hover:text-gray-700" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-black text-2xl hover:text-gray-700" />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-black text-2xl hover:text-gray-700" />
          {/* nao achei o icone do X no repositorio */}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
