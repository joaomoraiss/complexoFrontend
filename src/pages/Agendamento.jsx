import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Agendamento = () => {
  const [formData, setFormData] = useState({
    studio: '',
    tatuador: '',
    data: '',
    hora: '',
    descricao: ''
  });

  const studios = ["Studio Canoa", "Casa Alfaia", "Borcelle Studio"];
  const tatuadoresPorStudio = {
    "Studio Canoa": ["Caio Neiva", "Vidal","Lucas"],
    "Casa Alfaia": ["Alysson", "Biana","Diniz","Cisco","Emanoel"],
    "Borcelle Studio": ["Márcio", "Junior","Igor"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agendamento enviado:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Agendar Sessão</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studio" className="block text-sm font-medium text-gray-700">Studio</label>
            <select
              id="studio"
              name="studio"
              value={formData.studio}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Selecione um studio</option>
              {studios.map((studio) => (
                <option key={studio} value={studio}>{studio}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tatuador" className="block text-sm font-medium text-gray-700">Tatuador</label>
            <select
              id="tatuador"
              name="tatuador"
              value={formData.tatuador}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={!formData.studio}
            >
              <option value="">Selecione um tatuador</option>
              {formData.studio && tatuadoresPorStudio[formData.studio].map((tatuador) => (
                <option key={tatuador} value={tatuador}>{tatuador}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Agendamento;
