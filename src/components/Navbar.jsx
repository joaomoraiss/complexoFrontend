import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoComplexo.png";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkHoverEffect =
    "relative text-base font-light before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full";

  return (
    <header className="sticky top-0 left-0 w-full shadow-md px-[15%] py-2.5 bg-white text-black flex items-center justify-between z-50">
      <Link to="/" className="logo mt-[-4px] mb-[-10px]">
        <img src={logo} alt="Logo" className="logo-img w-[120px] h-auto" />
      </Link>

      <button onClick={toggleMenu} className="block sm:hidden text-black">
        <RxHamburgerMenu className="w-8 h-8" />
      </button>

      <div
        className={`${
          isMenuOpen
            ? "flex flex-col items-center absolute top-[5rem] left-0 w-full bg-white py-4 z-40 border-t border-gray-300"
            : "hidden sm:flex space-x-[60px]"
        }`}
      >
        <Link to="/sobre" className={linkHoverEffect}>
          SOBRE
        </Link>
        <Link to="/nos" className={linkHoverEffect}>
          NÓS
        </Link>
        <Link to="/junta-se" className={linkHoverEffect}>
          JUNTAR-SE
        </Link>
        <Link to="/contato" className={linkHoverEffect}>
          CONTATO
        </Link>
      </div>

      <Link
        to="/iniciar-sessao"
        className={`${linkHoverEffect} hidden sm:block`}
      >
        INICIAR SESSÃO
      </Link>
    </header>
  );
};

export default Navbar;
