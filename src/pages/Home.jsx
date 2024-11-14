import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/teste1.jpg";
import Carousel from "../components/Carousel";
import Newsletter from "../components/Newsletter";

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
      <div
        className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
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

      <div className="mt-16 mb-16">
        <Carousel />
      </div>

      <div className="mt-20 mb-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
