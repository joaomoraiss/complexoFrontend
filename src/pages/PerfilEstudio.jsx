import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PerfilEstudio = () => {
  const navigate = useNavigate();
  // Obtém os dados do estúdio do localStorage
  const [estudioData, setEstudioData] = useState(() => {
    const storedData = localStorage.getItem("estudio");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [abaAtiva, setAbaAtiva] = useState("informacoes");

  // Estados para os campos de edição do ESTÚDIO
  const [editStudioName, setEditStudioName] = useState("");
  const [editStudioDescription, setEditStudioDescription] = useState("");
  const [editStudioInstagram, setEditStudioInstagram] = useState("");
  const [editProfilePictureBase64, setEditProfilePictureBase64] = useState("");

  // --- NOVOS ESTADOS PARA ADICIONAR ARTISTA ---
  const [showAddArtistForm, setShowAddArtistForm] = useState(false); // Para controlar a visibilidade do formulário
  // Estado para um ÚNICO novo artista sendo adicionado
  const [newArtistFormData, setNewArtistFormData] = useState({
    nome: "",
    estilo: "",
    descricao: "",
    biografia: "", // Adicionado campo de biografia
    instagram: "",
    fotos: [],
  });
  // --- FIM DOS NOVOS ESTADOS ---


  // useEffect para preencher os estados de edição do estúdio
  useEffect(() => {
    if (abaAtiva === "editar" && estudioData) {
      setEditStudioName(estudioData.studioName || "");
      setEditStudioDescription(estudioData.studioDescription || "");
      setEditStudioInstagram(estudioData.studioInstagram || "");
      setEditProfilePictureBase64(estudioData.profilePictureBase64 || "");
    }
  }, [abaAtiva, estudioData]);

  if (!estudioData) {
    return <p className="text-center mt-10">Nenhum dado de estúdio encontrado. Faça login novamente.</p>;
  }

  const abas = [
    { id: "informacoes", label: "Informações" },
    { id: "galeria", label: "Galeria" },
    { id: "artistas", label: "Artistas" },
    { id: "editar", label: "Editar Dados" },
  ];

  // Função para converter arquivo para Base64 (reutilizada do JuntaSe)
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Função para lidar com a mudança da imagem de perfil do ESTÚDIO
  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setEditProfilePictureBase64(base64); // Armazena a string Base64
    }
  };

  // --- FUNÇÕES DE MANIPULAÇÃO DO FORMULÁRIO DE NOVO ARTISTA (ADAPTADAS DO JuntaSe) ---
  const handleNewArtistChange = (e) => {
    const { name, value } = e.target;
    setNewArtistFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewArtistPhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(Array.from(files).slice(0, 5).map(toBase64)); // Limite de 5 fotos
    setNewArtistFormData((prev) => ({ ...prev, fotos: base64Files }));
  };
  // --- FIM DAS FUNÇÕES DE MANIPULAÇÃO DO FORMULÁVEL DE NOVO ARTISTA ---


  // Função para enviar os dados atualizados do ESTÚDIO para o backend
  const handleUpdateEstudio = async (e) => {
    e.preventDefault();

    const updatedData = {
      studioId: estudioData.studioId,
      studioName: editStudioName,
      studioDescription: editStudioDescription,
      studioInstagram: editStudioInstagram,
      profilePictureBase64: editProfilePictureBase64,
    };

    try {
      const response = await fetch(`http://localhost:8080/usuarios/${estudioData.studioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados do estúdio recebidos do backend após PUT:", data);
        localStorage.setItem("estudio", JSON.stringify(data));
        setEstudioData(data);
        alert("Dados do estúdio atualizados com sucesso!");
        setAbaAtiva("informacoes");
      } else {
        const errorData = await response.json();
        alert(`Erro ao atualizar dados: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na requisição de atualização do estúdio:", error);
      alert("Erro ao conectar com o servidor para atualizar o estúdio.");
    }
  };


  // --- FUNÇÃO PARA ADICIONAR UM NOVO ARTISTA (ADAPTADA DO JuntaSe E DA REQUISIÇÃO ANTERIOR) ---
  const handleAddArtist = async (e) => {
    e.preventDefault();

    // Mapeia os nomes dos campos do formulário para os nomes esperados pelo Spring Boot Artist Model
    const artistPayload = {
      artistName: newArtistFormData.nome,
      artistStyle: newArtistFormData.estilo,
      artistDescription: newArtistFormData.descricao,
      artistBiography: newArtistFormData.biografia, // Mapeando a biografia
      instagramLink: newArtistFormData.instagram,
      artistImages: newArtistFormData.fotos,
    };

    try {
      // Endpoint para criar um artista, associando-o ao studioId via @RequestParam
      const response = await fetch(`http://localhost:8080/artistas?studioId=${estudioData.studioId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(artistPayload),
      });

      if (response.ok) {
        // const createdArtist = await response.json(); // Se precisar dos dados do artista recém-criado
        alert("Artista adicionado com sucesso!");

        // Recarregar os dados do estúdio para atualizar a lista de artistas
        const updatedEstudioResponse = await fetch(`http://localhost:8080/usuarios/${estudioData.studioId}`);
        if (updatedEstudioResponse.ok) {
            const updatedEstudio = await updatedEstudioResponse.json();
            localStorage.setItem("estudio", JSON.stringify(updatedEstudio));
            setEstudioData(updatedEstudio); // Atualiza o estado para re-renderizar com o novo artista
        } else {
            console.error("Erro ao recarregar dados do estúdio após adicionar artista.");
        }

        // Limpa o formulário de novo artista
        setNewArtistFormData({
          nome: "",
          estilo: "",
          descricao: "",
          biografia: "",
          instagram: "",
          fotos: [],
        });
        setShowAddArtistForm(false); // Esconde o formulário
        setAbaAtiva("artistas"); // Mantém na aba de artistas
      } else {
        const errorData = await response.json();
        alert(`Erro ao adicionar artista: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na requisição de adicionar artista:", error);
      alert("Erro ao conectar com o servidor para adicionar artista.");
    }
  };
  // --- FIM DA FUNÇÃO handleAddArtist ---


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
            {estudioData.profilePictureBase64 && (
              <img
                src={estudioData.profilePictureBase64}
                alt="Logo do estúdio"
                className="w-32 h-32 rounded object-cover mb-4"
              />
            )}
            <p><strong>Nome:</strong> {estudioData.studioName}</p>
            <p><strong>Email:</strong> {estudioData.studioEmail}</p>
            <p><strong>Endereço:</strong> {estudioData.studioAdress}</p>
            <p><strong>Descrição:</strong> {estudioData.studioDescription}</p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                className="text-blue-600 underline"
                href={estudioData.studioInstagram}
                target="_blank"
                rel="noreferrer"
              >
                {estudioData.studioInstagram}
              </a>
            </p>
          </div>
        )}

        {abaAtiva === "galeria" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Galeria do Estúdio</h3>
            <div className="flex flex-wrap gap-4">
              {estudioData.studioImages?.length > 0 ? (
                estudioData.studioImages.map((foto, index) => (
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

        {/* --- CONTEÚDO DA ABA ARTISTAS COM FORMULÁRIO DE ADIÇÃO --- */}
        {abaAtiva === "artistas" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Artistas</h3>
            
            {/* Botão para mostrar/esconder o formulário de adicionar artista */}
            <button
              onClick={() => setShowAddArtistForm(!showAddArtistForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
            >
              {showAddArtistForm ? "Cancelar Adição" : "Adicionar Novo Artista"}
            </button>

            {/* Formulário de Adicionar Novo Artista */}
            {showAddArtistForm && (
              <div className="bg-white p-4 rounded-md shadow-inner mb-6">
                <h4 className="text-lg font-semibold mb-3">Novo Artista</h4>
                <form onSubmit={handleAddArtist} className="space-y-3">
                  <div>
                    <label htmlFor="newArtistName" className="block text-sm font-medium text-gray-700">Nome:</label>
                    <input
                      type="text"
                      id="newArtistName"
                      name="nome" // Usar 'name' para mapear com newArtistFormData
                      value={newArtistFormData.nome}
                      onChange={handleNewArtistChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newArtistStyle" className="block text-sm font-medium text-gray-700">Estilo:</label>
                    <select
                      id="newArtistStyle"
                      name="estilo" // Usar 'name' para mapear com newArtistFormData
                      value={newArtistFormData.estilo}
                      onChange={handleNewArtistChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                        <option value="">Selecione o estilo</option>
                        <option value="realista">Realista</option>
                        <option value="aquarela">Aquarela</option>
                        <option value="pontilhismo">Pontilhismo</option>
                        <option value="tradicional">Tradicional</option>
                        <option value="fineline">Fineline</option>
                        <option value="oldschool">Old School</option>
                        <option value="neotradicional">Neo Tradicional</option>
                        <option value="oriental">Oriental</option>
                        <option value="blackwork">Blackwork</option>
                        <option value="geometrica">Geométrica</option>
                        <option value="escrita">Escrita</option>
                        <option value="outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="newArtistDescription" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <textarea
                      id="newArtistDescription"
                      name="descricao" // Usar 'name' para mapear com newArtistFormData
                      value={newArtistFormData.descricao}
                      onChange={handleNewArtistChange}
                      rows="3"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="newArtistBiography" className="block text-sm font-medium text-gray-700">Biografia:</label>
                    <textarea
                      id="newArtistBiography"
                      name="biografia" // Usar 'name' para mapear com newArtistFormData
                      value={newArtistFormData.biografia}
                      onChange={handleNewArtistChange}
                      rows="3"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="newArtistInstagramLink" className="block text-sm font-medium text-gray-700">Instagram:</label>
                    <input
                      type="url"
                      id="newArtistInstagramLink"
                      name="instagram" // Usar 'name' para mapear com newArtistFormData
                      value={newArtistFormData.instagram}
                      onChange={handleNewArtistChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="newArtistImages" className="block text-sm font-medium text-gray-700">Fotos do Artista:</label>
                    <input
                      type="file"
                      id="newArtistImages"
                      accept="image/*"
                      multiple // Permite múltiplos arquivos
                      onChange={handleNewArtistPhotoUpload} // Usar a função de upload de fotos do artista
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                    {newArtistFormData.fotos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newArtistFormData.fotos.map((imgBase64, idx) => (
                          <img
                            key={idx}
                            src={imgBase64}
                            alt={`Preview ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Salvar Artista
                  </button>
                </form>
              </div>
            )}
            
            {/* Lista de Artistas Existentes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {estudioData.artistStudio?.length > 0 ? (
                estudioData.artistStudio.map((artist, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md bg-white shadow"
                  >
                    <p><strong>Nome:</strong> {artist.artistName}</p>
                    <p><strong>Estilo:</strong> {artist.artistStyle}</p>
                    <p><strong>Descrição:</strong> {artist.artistDescription}</p>
                    <p><strong>Biografia:</strong> {artist.artistBiography}</p>
                    <p>
                      <strong>Instagram:</strong>{" "}
                      <a
                        className="text-blue-500 underline"
                        href={artist.instagramLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {artist.instagramLink}
                      </a>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {artist.artistImages?.map((foto, i) => (
                        <img
                          key={i}
                          src={foto}
                          alt={`Foto ${i + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Mensagem quando não há artistas E o formulário NÃO está visível
                !showAddArtistForm && (
                  <p>Nenhum artista cadastrado para este estúdio. Clique em "Adicionar Novo Artista" para começar.</p>
                )
              )}
            </div>
          </div>
        )}
        {/* --- FIM DO CONTEÚDO DA ABA ARTISTAS --- */}

        {abaAtiva === "editar" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Editar Dados do Estúdio</h3>
            <form onSubmit={handleUpdateEstudio} className="space-y-4">
              {/* Campos de edição do ESTÚDIO */}
              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                  Foto de Perfil:
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {editProfilePictureBase64 && (
                  <img
                    src={editProfilePictureBase64}
                    alt="Pré-visualização da foto de perfil"
                    className="w-24 h-24 object-cover rounded-full mt-2"
                  />
                )}
              </div>

              <div>
                <label htmlFor="studioName" className="block text-sm font-medium text-gray-700">
                  Nome do Estúdio:
                </label>
                <input
                  type="text"
                  id="studioName"
                  value={editStudioName}
                  onChange={(e) => setEditStudioName(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="studioDescription" className="block text-sm font-medium text-gray-700">
                  Descrição:
                </label>
                <textarea
                  id="studioDescription"
                  value={editStudioDescription}
                  onChange={(e) => setEditStudioDescription(e.target.value)}
                  rows="4"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="studioInstagram" className="block text-sm font-medium text-gray-700">
                  Link do Instagram:
                </label>
                <input
                  type="url"
                  id="studioInstagram"
                  value={editStudioInstagram}
                  onChange={(e) => setEditStudioInstagram(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Salvar Alterações
              </button>
            </form>
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