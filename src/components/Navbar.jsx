
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoComplexo.png';

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 w-full shadow-md px-[15%] py-2.5 bg-white text-black flex items-center justify-between z-50">
      <Link to="/" className="logo mt-[-4px] mb-[-10px]">
        <img src={logo} alt="Logo" className="logo-img w-[120px] h-auto" />
      </Link>
      
      <div className="flex items-center justify-center flex-grow">
        <nav className="flex space-x-[60px]">
          <Link to="/sobre" className="relative text-base font-light before:absolute before:top-full before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
            SOBRE
          </Link>
          <Link to="/nos" className="relative text-base font-light before:absolute before:top-full before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
            NÓS
          </Link>
          <Link to="/junta-se" className="relative text-base font-light before:absolute before:top-full before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
            JUNTAR-SE
          </Link>
          <Link to="/contato" className="relative text-base font-light before:absolute before:top-full before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
            CONTATO
          </Link>
        </nav>
      </div>

     
      <Link to="/iniciar-sessao" className="relative text-base font-light mr-[0px] before:absolute before:top-full before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
        INICIAR SESSÃO
      </Link>
    </header>
  );
};

export default Navbar;













