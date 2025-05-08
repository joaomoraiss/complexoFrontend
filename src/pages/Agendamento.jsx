import React, { useState } from "react";

const Agendamento = () => {
  const [formData, setFormData] = useState({
    studio: "",
    tatuador: "",
    data: "",
    hora: "",
    descricao: "",
  });

  const studios = ["Studio Canoa", "Casa Alfaia", "Borcelle Studio"];
  const tatuadoresPorStudio = {
    "Studio Canoa": ["Caio Neiva", "Vidal", "Lucas"],
    "Casa Alfaia": ["Alysson", "Biana", "Diniz", "Cisco", "Emanoel"],
    "Borcelle Studio": ["Márcio", "Junior", "Igor"],
  };

  // Mapeamento de link Cal.com por estúdio
  const calLinks = {
    "Studio Canoa": "https://cal.com/complexo-tatuagem-arte-calvsc/30min",
    "Casa Alfaia": "https://cal.com/complexo-tatuagem-arte-calvsc/15min",
    "Borcelle Studio": "https://cal.com/complexo-tatuagem-arte-calvsc/45min",
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
    alert("Agendamento iniciado! Selecione o horário no calendário abaixo.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Agendar Sessão</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studio">Studio</label>
            <select
              name="studio"
              value={formData.studio}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione um studio</option>
              {studios.map((studio) => (
                <option key={studio} value={studio}>{studio}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tatuador">Tatuador</label>
            <select
              name="tatuador"
              value={formData.tatuador}
              onChange={handleChange}
              required
              disabled={!formData.studio}
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione um tatuador</option>
              {formData.studio &&
                tatuadoresPorStudio[formData.studio].map((tatuador) => (
                  <option key={tatuador} value={tatuador}>{tatuador}</option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="data">Data</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="hora">Hora</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Avançar para Calendário
          </button>
        </form>
      </div>

      {formData.studio && (
        <div className="w-full max-w-4xl h-[700px]">
          <iframe
            src={calLinks[formData.studio]}
            style={{ border: 0 }}
            width="100%"
            height="700"
            frameBorder="0"
            title="Agendamento com Cal.com"
            allow="camera; microphone; fullscreen; speaker"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Agendamento;
