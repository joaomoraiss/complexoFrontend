import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Importando o ícone do Instagram do Font Awesome (Fa)
import { FaInstagram } from "react-icons/fa"; // Certifique-se de ter 'react-icons' instalado
import { MdLocationOn } from "react-icons/md"; // Ícone de localização

const MeuPerfilPublico = () => {
  const { studioId } = useParams();
  const [estudio, setEstudio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstudio = async () => {
      try {
        // ATENÇÃO: Se seu backend local estiver rodando, mude esta URL para localhost:8080
        // Por exemplo: `http://localhost:8080/usuarios/${studioId}`
        const response = await fetch(`https://complexobackend.onrender.com/usuarios/${studioId}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do estúdio");
        const data = await response.json();
        setEstudio(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstudio();
  }, [studioId]);

  if (loading) return <p className="text-center mt-10">Carregando dados...</p>;
  if (!estudio) return <p className="text-center mt-10">Estúdio não encontrado.</p>;

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <img
            src={estudio.profilePictureBase64}
            alt="Logo"
            className="w-32 h-32 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{estudio.studioName}</h1>
            <p className="text-slate-700 mb-2">{estudio.studioDescription}</p>

            {/* Novo: Endereço do Estúdio */}
            {estudio.studioAdress && ( // Verifica se o endereço existe
              <p className="text-gray-700 mb-2 flex items-center gap-2">
                <MdLocationOn className="text-xl text-blue-500" />
                {estudio.studioAdress}
              </p>
            )}

            {/* Instagram estilizado para o Estúdio */}
            {estudio.studioInstagram && ( // Verifica se o Instagram existe
              <a
                href={`https://instagram.com/${estudio.studioInstagram.replace(/^@/, '')}`} // Garante que não tenha '@' duplicado no link
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-2 font-semibold" // Adiciona font-semibold para negrito e flex para alinhamento do ícone
              >
                <FaInstagram className="text-xl text-pink-600" /> {/* Ícone do Instagram */}
                Instagram
              </a>
            )}
          </div>
        </div>

        {/* Galeria */}
        <h2 className="text-2xl font-semibold mb-4">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {estudio.studioImages?.length > 0 ? (
            estudio.studioImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Foto ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>Sem imagens cadastradas.</p>
          )}
        </div>

        {/* Artistas */}
        <h2 className="text-2xl font-semibold mb-4">Artistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {estudio.artistStudio?.length > 0 ? (
            estudio.artistStudio.map((artist, index) => (
              <div
                key={index}
                className="border p-4 rounded-md shadow-md bg-white"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={artist.artistImages?.[0]}
                    alt={artist.artistName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{artist.artistName}</h3>
                    <p className="text-sm text-gray-600">{artist.artistStyle}</p>
                  </div>
                </div>
                <p className="mb-2">{artist.artistDescription}</p>
                {artist.instagramLink && (
                  // Instagram estilizado para o Artista (mantido similar ao do estúdio)
                  <a
                    href={`https://instagram.com/${artist.instagramLink.replace(/^@/, '')}`} // Garante que não tenha '@' duplicado no link
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-2 font-semibold"
                  >
                    <FaInstagram className="text-xl text-pink-600" />
                    Instagram
                  </a>
                )}

                {/* Mini Galeria */}
                {artist.artistImages?.length > 1 && (
                  <div className="flex gap-2 mt-3">
                    {artist.artistImages.slice(1, 5).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Foto ${i + 2}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Nenhum artista cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeuPerfilPublico;