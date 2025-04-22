import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Carousel from "../components/Carousel";
import Newsletter from "../components/Newsletter";
import bannerImage from "../assets/casaalfaia.svg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5, triggerOnce: false });
  const { ref: section2Ref, inView: section2InView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: section3Ref, inView: section3InView } = useInView({ threshold: 0.1, triggerOnce: false });

  const [animateHero, setAnimateHero] = useState(false);
  const [leftAnimate, setLeftAnimate] = useState(false);
  const [rightAnimate, setRightAnimate] = useState(false);

  useEffect(() => {
    if (heroInView) {
      setAnimateHero(true);
      setTimeout(() => setAnimateHero(false), 1000);
    }
  }, [heroInView]);

  useEffect(() => {
    if (section2InView) {
      setLeftAnimate(true);
      setTimeout(() => setLeftAnimate(false), 1000);
    }
  }, [section2InView]);

  useEffect(() => {
    if (section3InView) {
      setRightAnimate(true);
      setTimeout(() => setRightAnimate(false), 1000);
    }
  }, [section3InView]);

  return (
    <div className="w-full">
      {/* Sessão 1 */}
      <section
        ref={heroRef}
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="flex flex-col gap-3 items-center">
          {/* Linha 1 */}
          <div
            className={`overflow-hidden ${
              animateHero ? 'animate-slideInLeftFast' : ''
            } bg-black px-4 py-1`}
          >
            <span
  className={`inline-block ${
    animateHero ? 'animate-slideInLeftText' : ''
  } text-3xl md:text-4xl lg:text-5xl font-light whitespace-nowrap`}
>
  Tatuagem, arte e cultura visual:
</span>
          </div>

          {/* Linha 2 */}
          <div className={`overflow-hidden ${animateHero ? 'animate-slideInRightFast' : ''} bg-black px-4 py-1`}>
  <span
    className={`inline-block ${
      animateHero ? 'animate-slideInRightText delay-200' : ''
    } text-2xl md:text-3xl lg:text-4xl font-light whitespace-nowrap`}
  >
    tudo em um só lugar.
  </span>
</div>

          {/* Botão */}
          <div className="mt-6 overflow-hidden">
  <Link to="/sobre">
    <button
      className={`inline-block ${
        animateHero ? 'animate-slideInLeftText delay-300' : ''
      } px-6 py-3 bg-black bg-opacity-95 text-white rounded-lg 
      hover:bg-white hover:text-black transition-colors duration-300`}
    >
      Saiba mais
    </button>
  </Link>
</div>
        </div>
      </section>

      {/* Sessão 2 */}
      <section
  ref={section2Ref}
  className="h-[300px] md:h-[300px] bg-cover bg-center relative flex flex-col md:flex-row items-stretch"
  style={{ backgroundImage: `url(${image2})` }}
>
  <div className="w-full md:w-1/2 h-full md:pl-[3cm] flex items-center justify-center">
    <div
      className={`bg-black h-full w-full shadow-lg p-6 md:p-8 text-white flex flex-col justify-center items-center text-center transition-all duration-700 ${
        leftAnimate ? 'animate-slideInLeft' : 'opacity-100'
      }`}
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-4">NOSSA MARCA</h2>
      <p className="text-sm md:text-base max-w-[85%] text-justify leading-relaxed">
        Inspirado na efervescente cena artística recifense, o Complexo nasce para dar voz e espaço
        aos estúdios de tatuagem de todo o Brasil, criando um ambiente exclusivo onde a arte na pele
        se encontra com outras formas de expressão visual.
      </p>
    </div>
  </div>
</section>
      {/* Sessão 3 */}
      <section
  ref={section3Ref}
  className="min-h-[300px] md:h-[300px] bg-cover bg-center relative flex flex-col md:flex-row items-stretch"
  style={{ backgroundImage: `url(${image3})` }}
>
  {/* Quadrado preto do lado direito no desktop, 100% no mobile */}
  <div className="w-full md:w-1/2 h-full md:pr-[3cm] flex items-center justify-center md:order-2">
    <div
      className={`bg-black h-full w-full p-6 md:p-8 text-white flex flex-col justify-center items-center text-center transition-all duration-700 ${
        rightAnimate ? 'animate-slideInRight' : 'opacity-100'
      }`}
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-4">AGENDAMENTO</h2>
      <p className="text-sm md:text-base mb-6 max-w-[85%] leading-relaxed text-justify">
        Solicite um orçamento <br /> e agende sua Tattoo
      </p>

      <Link to="/agendamento">
      <button className="px-6 py-3 bg-white text-black rounded hover:bg-gray-600 hover:text-white transition-colors duration-300">
      Agendar
     </button>
     </Link>

    </div>
  </div>
  {/* Imagem apenas no desktop (não ocupa espaço no mobile) */}
  <div className="hidden md:flex md:w-1/2 md:h-full md:order-1" />
</section>



      {/* Carousel */}
      <div className="mt-16 mb-16">
        <Carousel />
      </div>

      {/* Newsletter */}
      <div className="mt-20 mb-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;