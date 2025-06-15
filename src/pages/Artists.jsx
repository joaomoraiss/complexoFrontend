import React, { useState } from "react";
import { Link } from "react-router-dom";

const Artistas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://complexobackend.onrender.com/usuarios/searchByName?name=${encodeURIComponent(searchTerm)}`
      );
      
      if (!response.ok) {
        throw new Error("Erro ao buscar estúdios");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="border border-gray-300 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-600 mb-2">
          Pesquise por Estúdios
        </h2>

        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Pesquise o nome do estúdio"
            className="w-full px-4 py-3 border-b border-gray-400 bg-gray-100 text-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-500 text-white px-8 py-3 ml-2 shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Pesquisar
          </button>
        </div>

        {loading && <p className="text-gray-500 mt-4">Carregando...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-600 mt-6 mb-4">
          Resultados da busca
        </h1>

        {results.length === 0 && !loading && (
          <p className="text-gray-500">Nenhum estúdio encontrado.</p>
        )}

        <div className="grid grid-cols-1 gap-8">
          {results.map((studio) => (
            <div
              key={studio.studioId}
              className="flex flex-col items-start p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                <Link 
                  to={`/studio/${studio.studioId}`} 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {studio.studioName}
                </Link>
              </h3>

              <div className="text-gray-600 space-y-2">
                <p>
                  <span className="font-medium">Endereço:</span> {studio.studioAdress || "N/A"}
                </p>
                
                <p>
                  <span className="font-medium">Descrição:</span> {studio.studioDescription || "N/A"}
                </p>
                
                {studio.studioInstagram && (
                  <p>
                    <span className="font-medium">Instagram:</span>{" "}
                    <a
                      href={studio.studioInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {studio.studioInstagram}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistas;