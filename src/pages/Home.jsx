import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Newsletter from "../components/Newsletter";
import video1 from "../assets/video2.mp4";

const Home = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowText(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Vídeo de fundo */}
      <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={video1} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Texto sobreposto ao vídeo */}
        <div
          className={`absolute text-center text-white transition-opacity duration-700 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "62%",
            left: "50%",
            transform: "translate(-50%, -30%)",
          }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light">
            Tatuagem, arte e cultura visual:
          </h1>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-light mt-2"
            style={{ transition: "opacity 1s ease-in-out 1s" }}
          >
            tudo em um só lugar.
          </h2>
          <button className="mt-4 px-6 py-3 bg-black bg-opacity-70 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
            Saiba mais
          </button>
        </div>
      </div>

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
