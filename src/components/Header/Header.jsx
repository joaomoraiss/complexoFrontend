import logoComplexo from '../../assets/logoComplexo.png'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { linkHoverEffect } from '../../utils/styles';

export default function Header(){

  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getLinkClasses = () => (isMenuOpen ? linkHoverEffect() : '');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640)setIsMenuOpen(false)};
    window.addEventListener('resize', handleResize)
    return () => {window.removeEventListener('resize', handleResize)}
  }, [])

  return(
    <div className="bg-gradient-to-b from-header-color to-header-color/0 h-36 flex sm:justify-between items-center justify-between ">
      <img  src={logoComplexo} alt="" className="hidden sm:block h-36 mb-5" />

      <button onClick={toggleMenu} className='mb-5 ml-10 block sm:hidden w-10 h-10'><RxHamburgerMenu className='h-8 w-8 ml-' />      </button>

      <div className={`${isMenuOpen ? 'flex flex-col absolute left-[7rem] top-10 border-black	border-solid border-[1px] p-3 rounded-md space-y-3 text-[11px] ' : 'hidden sm:flex text-center space-x-16 mr-80 mb-10 font-bold	text-text-color text-[13px] leading-[12px] '}`}>
      <Link className={getLinkClasses()} to="/">INÍCIO</Link>
      <Link className={getLinkClasses()} to="/sobre">SOBRE</Link>
      <Link className={getLinkClasses()} to="/nos">NÓS</Link>
      <Link className={getLinkClasses()} to="/juntarse">JUNTAR-SE</Link>
      <Link className={getLinkClasses()} to="/contato">CONTATO</Link>
      </div>

      <div className='mb-10 mr-12 font-bold text-text-color text-[13px] bg-[#BCB9B9] px-3 rounded-md' >
        <Link to="/login">LOGIN</Link>
      </div>
    </div>
  )
}