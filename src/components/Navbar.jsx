import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthContext } from "../utils/AuthContext";
import logo from "../assets/logoComplexo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'mais', 'usuario' ou null
  const { isAuthenticated, studioName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [estudioData, setEstudioData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("estudio");
    if (storedData) {
      setEstudioData(JSON.parse(storedData));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleLogout = () => {
    logout();
    navigate("/iniciar-sessao");
  };

  const closeDropdown = () => setOpenDropdown(null);

  const linkHoverEffect = `
    relative text-base font-light 
    before:absolute before:top-full before:left-0 before:w-0 
    before:h-[2px] before:bg-black before:transition-all 
    before:duration-300 hover:before:w-full
  `;

  return (
    <header className="sticky top-0 left-0 w-full shadow-md px-[15%] py-2.5 bg-white text-black flex items-center justify-between z-50">
      <Link to="/" className="logo mt-[-4px] mb-[-10px]">
        <img src={logo} alt="Logo" className="logo-img w-[120px] h-auto" />
      </Link>

      <button onClick={toggleMenu} className="block sm:hidden text-black">
        <RxHamburgerMenu className="w-8 h-8" />
      </button>

      {/* Links do menu */}
      <div
        className={`${
          isMenuOpen
            ? "flex flex-col items-center absolute top-[5rem] left-0 w-full bg-white py-4 z-40 border-t border-gray-300"
            : "hidden sm:flex space-x-[55px]"
        }`}
      >
        <Link to="/sobre" className={linkHoverEffect}>
          SOBRE
        </Link>
        <Link to="/junta-se" className={linkHoverEffect}>
          JUNTAR-SE
        </Link>
        <Link to="/artistas" className={linkHoverEffect}>
          ESTUDIOS
        </Link>
        <Link to="/agendamento" className={linkHoverEffect}>
          AGENDAR
        </Link>

        {/* Dropdown "Mais" */}
        <div
          className="relative"
          onMouseEnter={() => setOpenDropdown("mais")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className={`${linkHoverEffect} focus:outline-none`}>
            MAIS
          </button>
          {openDropdown === "mais" && (
            <div className="absolute mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <Link
                to="/contato"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Contato
              </Link>
              <Link
                to="/nos"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Nós
              </Link>
              <Link
                to="/redes-sociais"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Redes Sociais
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown do Usuário */}
      {!isAuthenticated ? (
        <Link
          to="/iniciar-sessao"
          className={`${linkHoverEffect} hidden sm:block`}
        >
          INICIAR SESSÃO
        </Link>
      ) : (
        <div className="relative">
          <button
            onClick={() => toggleDropdown("usuario")}
            className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Olá, {studioName || "Usuário"}
          </button>

          {openDropdown === "usuario" && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <Link
                to="/perfil-estudio"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Meu Perfil
              </Link>
              <Link
                to="/agendamento"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Meus Agendamentos
              </Link>
              <Link
                to={
                  estudioData
                    ? `/studio/${estudioData.studioId}`
                    : "/"
                }
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Minha Página 
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeDropdown();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

