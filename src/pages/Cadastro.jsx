// src/pages/Cadastro.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cadastro = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {" "}
      {/* Fundo branco e sem borda */}
      <h2 className="text-2xl font-semibold text-center mb-6">
        Faça parte do Complexo
      </h2>
      <form className="w-full max-w-md">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome do Estúdio/Tatuador:
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          required
        />

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          required
        />

        <label
          htmlFor="portfolio"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Upload de Fotos para o Portfólio:
        </label>
        <input
          type="file"
          id="portfolio"
          multiple
          onChange={handleImageUpload}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedImages.map((file, index) => (
            <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Senha:
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          required
        />

        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirma senha:
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          required
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-gray-600"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            aceito os{" "}
            <a href="/termos" className="text-gray-500 underline">
              termos de uso
            </a>{" "}
            da plataforma
          </label>
        </div>

        <div className="text-center mb-4">
          <Link
            to="/iniciar-sessao"
            className="text-sm text-gray-500 hover:underline"
          >
            já tem uma conta? faça login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
