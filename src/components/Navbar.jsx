import React from 'react';
import logo from '../assets/logoComplexo.png';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full shadow-md px-[15%] py-2.5 bg-transparent flex justify-between items-center z-100">
      <a href="/" className="logo mt-[-4px] mb-[-10px]">
        <img src={logo} alt="Logo" className="logo-img w-[100px] h-auto" />
      </a>
      <nav className="navbar flex justify-center flex-grow mr-[150px]">
        <a href="/" className="relative text-lg text-black font-light ml-[60px] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
          SOBRE
        </a>
        <a href="/" className="relative text-lg text-black font-light ml-[60px] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
          NÓS
        </a>
        <a href="/" className="relative text-lg text-black font-light ml-[60px] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
          JUNTAR-SE
        </a>
        <a href="/" className="relative text-lg text-black font-light ml-[60px] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
          CONTATO
        </a>
      </nav>
    </header>
  );
};

export default Navbar;



