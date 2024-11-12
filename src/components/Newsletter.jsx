
import React from 'react';

const Newsletter = () => {
  return (
    <div className="max-w-3xl mx-auto border border-gray-300 p-6 mt-16">
      <h2 className="text-lg font-semibold text-gray-600 mb-2">NEWSLETTER</h2>
      <p className="text-sm text-gray-500">Se você quer ficar por dentro.<br />Deixa seu e-mail abaixo:</p>
      <div className="mt-4 flex">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full px-4 py-3 border-b border-gray-400 bg-gray-100 text-gray-700 focus:outline-none"
        />
        <button className="bg-gray-500 text-white px-8 py-3 ml-2 shadow-md">
          ENVIAR
        </button>
      </div>
    </div>
  );
};

export default Newsletter;

