import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PerfilEstudio = () => {
  const navigate = useNavigate();
  const estudioData = JSON.parse(localStorage.getItem("estudio"));

  const [abaAtiva, setAbaAtiva] = useState("informacoes");

  if (!estudioData) {
    return <p className="text-center mt-10">Nenhum dado de estúdio encontrado.</p>;
  }

  const abas = [
    { id: "informacoes", label: "Informações" },
    { id: "galeria", label: "Galeria" },
    { id: "artistas", label: "Artistas" },
    { id: "editar", label: "Editar Dados" },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meu perfil</h2>

      {/* Menu de Abas */}
      <div className="flex gap-6 border-b pb-2 mb-6">
        {abas.map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            className={`${
              abaAtiva === aba.id
                ? "border-b-2 border-black text-black font-medium"
                : "text-gray-500 hover:text-black"
            } pb-2`}
          >
            {aba.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-5xl">
        {abaAtiva === "informacoes" && (
          <div>
            {estudioData.foto && (
              <img
                src={estudioData.foto}
                alt="Logo do estúdio"
                className="w-32 h-32 rounded object-cover mb-4"
              />
            )}
            <p><strong>Nome:</strong> {estudioData.nome}</p>
            <p><strong>Email:</strong> {estudioData.email}</p>
            <p><strong>Endereço:</strong> {estudioData.endereco}</p>
            <p><strong>Descrição:</strong> {estudioData.descricao}</p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                className="text-blue-600 underline"
                href={estudioData.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {estudioData.instagram}
              </a>
            </p>
          </div>
        )}

        {abaAtiva === "galeria" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Galeria do Estúdio</h3>
            <div className="flex flex-wrap gap-4">
              {estudioData.galeria?.length > 0 ? (
                estudioData.galeria.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))
              ) : (
                <p>Sem fotos na galeria.</p>
              )}
            </div>
          </div>
        )}

        {abaAtiva === "artistas" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Artistas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {estudioData.artistas?.map((artist, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-white shadow"
                >
                  <p><strong>Nome:</strong> {artist.nome}</p>
                  <p><strong>Estilo:</strong> {artist.estilo}</p>
                  <p><strong>Descrição:</strong> {artist.descricao}</p>
                  <p>
                    <strong>Instagram:</strong>{" "}
                    <a
                      className="text-blue-500 underline"
                      href={artist.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {artist.instagram}
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {artist.fotos?.map((foto, i) => (
                      <img
                        key={i}
                        src={foto}
                        alt={`Foto ${i + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === "editar" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Editar Dados</h3>
            <p>Aqui futuramente entra o formulário para editar email, senha, descrição e fotos.</p>
            {/* Aqui pode ser implementado os inputs e botões de atualização */}
          </div>
        )}
      </div>

      <button
        className="mt-6 bg-black text-white px-6 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
    </div>
  );
};

export default PerfilEstudio;

