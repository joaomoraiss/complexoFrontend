import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthContext } from "../utils/AuthContext";
import logo from "../assets/logoComplexo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, studioName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    navigate("/iniciar-sessao");
  };

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
        <Link to="/artistas" className={linkHoverEffect}>
          ARTISTAS
        </Link>
        <Link to="/agendamento" className={linkHoverEffect}>
          AGENDAMENTO
        </Link>
      </div>

      {!isAuthenticated ? (
        <Link
          to="/iniciar-sessao"
          className={`${linkHoverEffect} hidden sm:block`}
        >
          INICIAR SESSÃO
        </Link>
      ) : (
        <div className="mt-4 flex flex-col items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <span className="text-lg font-medium text-black">
            Olá, {studioName || "Usuário"}
          </span>
          <button
            onClick={handleLogout}
            className="pt-0 relative inline-flex text-black text-xs px-4 py-1.5 rounded-md hover: overflow-hidden group"
          >
            {Array.from("Sair").map((letter, index) => (
              <span
                key={index}
                className="inline-block transition-colors duration-300 group-hover:text-red-500"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {letter}
              </span>
            ))}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
