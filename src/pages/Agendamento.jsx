import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "1023345179954-bl64qi03ojpgdm57k97a5sjoaf7f9guk.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

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

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      const isSignedIn = authInstance.isSignedIn.get();

      if (!isSignedIn) throw new Error("Usuário não autenticado");

      const { data, hora, studio, tatuador, descricao } = formData;
      const startDateTime = `${data}T${hora}:00`;
      const endDateTime = `${data}T${hora}:59`;

      const event = {
        summary: `Sessão com ${tatuador} - ${studio}`,
        description: descricao,
        start: {
          dateTime: startDateTime,
          timeZone: "America/Recife",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "America/Recife",
        },
      };

      const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      request.execute((event) => {
        alert("Agendamento criado no Google Agenda!");
        console.log("Evento criado:", event);
      });
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      alert("Erro ao agendar. Verifique a autenticação.");
    }
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
              {formData.studio && tatuadoresPorStudio[formData.studio].map((tatuador) => (
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
            Agendar
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl h-[600px]">
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ24RnYAyUJlwxQf5FBWgFBr_lf_9mQjS137HhCajFInOi9egFxq_Klu1yRBXX6LpPSkfskC9RAe?gv=true"
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          title="Agendamento Google Agenda"
        ></iframe>
      </div>
    </div>
  );
};

export default Agendamento;

