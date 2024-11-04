import logoComplexo from '../../assets/logoComplexo.png'
import { Link } from 'react-router-dom';
export default function Header(){
  return(
    <div className="bg-gradient-to-b from-header-color to-header-color/0 h-36 flex justify-between items-center ">
      <img src={logoComplexo} alt="" className="h-36 mb-5" />
      <div className='flex text-center space-x-16 mr-80 mb-10 font-bold	text-text-color text-[12px] leading-[12px]'>
        <Link to="/">INÍCIO</Link>
        <Link to="/sobre">SOBRE</Link>
        <Link to="/nos">NÓS</Link>
        <Link to="/juntarse">JUNTAR-SE</Link>
        <Link to="/contato">CONTATO</Link>
      </div>
      <div className='mb-10 mr-12 font-bold text-text-color text-[12px] bg-[#BCB9B9] px-3 rounded-md' >
        <Link to="/login">LOGIN</Link>
      </div>
    </div>
  )
}