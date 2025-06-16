import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PerfilEstudio = () => {
  const navigate = useNavigate();
  const [estudioData, setEstudioData] = useState(() => {
    const storedData = localStorage.getItem("estudio");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [editStudioName, setEditStudioName] = useState("");
  const [editStudioDescription, setEditStudioDescription] = useState("");
  const [editStudioInstagram, setEditStudioInstagram] = useState("");
  const [editProfilePictureBase64, setEditProfilePictureBase64] = useState("");
  const [showAddArtistForm, setShowAddArtistForm] = useState(false);

  const [newArtistFormData, setNewArtistFormData] = useState({
    nome: "",
    estilo: "",
    descricao: "",
    biografia: "",
    instagram: "", // Este campo também será ajustado para nome de usuário
    fotos: [],
  });

  useEffect(() => {
    if (abaAtiva === "editar" && estudioData) {
      setEditStudioName(estudioData.studioName || "");
      setEditStudioDescription(estudioData.studioDescription || "");
      // Ao carregar para edição, remove a URL e pega só o nome de usuário se for uma URL completa
      if (estudioData.studioInstagram) {
        try {
          const url = new URL(estudioData.studioInstagram);
          const pathParts = url.pathname.split('/').filter(Boolean);
          setEditStudioInstagram(pathParts[0] || ""); // Pega a primeira parte do path como nome de usuário
        } catch (e) {
          // Se não for uma URL válida, assume que já é o nome de usuário
          setEditStudioInstagram(estudioData.studioInstagram.replace(/^@/, '') || "");
        }
      } else {
        setEditStudioInstagram("");
      }
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
    { id: "perfilpublico", label: "Minha Página" },
  ];

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setEditProfilePictureBase64(base64);
    }
  };

  const handleNewArtistChange = (e) => {
    const { name, value } = e.target;

    if (name === "instagram") {
      try {
        const url = new URL(value);
        const pathParts = url.pathname.split('/').filter(Boolean);
        setNewArtistFormData((prev) => ({ ...prev, [name]: pathParts[0] || "" }));
      } catch (e) {
        setNewArtistFormData((prev) => ({ ...prev, [name]: value.replace(/^@/, '') }));
      }
    } else {
      setNewArtistFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNewArtistPhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(files.slice(0, 5).map(toBase64));
    setNewArtistFormData((prev) => ({ ...prev, fotos: base64Files }));
  };

  const handleUpdateEstudio = async (e) => {
    e.preventDefault();


    const instagramToSend = editStudioInstagram.replace(/^@/, '');

    const updatedData = {
      studioId: estudioData.studioId,
      studioName: editStudioName,
      studioDescription: editStudioDescription,
      studioInstagram: instagramToSend, 
      profilePictureBase64: editProfilePictureBase64, 
    };

    try {
      const response = await fetch(`https://complexobackend.onrender.com/usuarios/${estudioData.studioId}`, {
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


  const handleAddArtist = async (e) => {
    e.preventDefault();


    const artistInstagramToSend = newArtistFormData.instagram.replace(/^@/, '');

    const artistPayload = {
      artistName: newArtistFormData.nome,
      artistStyle: newArtistFormData.estilo,
      artistDescription: newArtistFormData.descricao,
      artistBiography: newArtistFormData.biografia,
      instagramLink: artistInstagramToSend, // Envia apenas o nome de usuário
      artistImages: newArtistFormData.fotos,
    };

    try {
      const response = await fetch(`https://complexobackend.onrender.com/artistas?studioId=${estudioData.studioId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artistPayload),
      });

      if (response.ok) {
        alert("Artista adicionado com sucesso!");

        // Recarregar os dados do estúdio para refletir o novo artista
        const updatedEstudioResponse = await fetch(`https://complexobackend.onrender.com/usuarios/${estudioData.studioId}`);
        if (updatedEstudioResponse.ok) {
          const updatedEstudio = await updatedEstudioResponse.json();
          localStorage.setItem("estudio", JSON.stringify(updatedEstudio));
          setEstudioData(updatedEstudio);
        } else {
          console.error("Erro ao recarregar dados do estúdio após adicionar artista.");
        }

        setNewArtistFormData({
          nome: "",
          estilo: "",
          descricao: "",
          biografia: "",
          instagram: "",
          fotos: [],
        });
        setShowAddArtistForm(false);
        setAbaAtiva("artistas");
      } else {
        const errorData = await response.json();
        alert(`Erro ao adicionar artista: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na requisição de adicionar artista:", error);
      alert("Erro ao conectar com o servidor para adicionar artista.");
    }
  };

  const handleRemoveArtist = async (artistId) => {
    if (!window.confirm("Tem certeza que deseja remover este artista?")) {
      return;
    }

    try {
      const response = await fetch(`https://complexobackend.onrender.com/artistas/${artistId}?studioId=${estudioData.studioId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Artista removido com sucesso!");

        const updatedArtists = estudioData.artistStudio.filter(artist => artist.artistId !== artistId);
        const updatedEstudioData = { ...estudioData, artistStudio: updatedArtists };
        localStorage.setItem("estudio", JSON.stringify(updatedEstudioData));
        setEstudioData(updatedEstudioData);
      } else {
        const errorData = await response.json();
        alert(`Erro ao remover artista: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na requisição de remover artista:", error);
      alert("Erro ao conectar com o servidor para remover artista.");
    }
  };


  const handleGalleryPhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(files.slice(0, 5).map(toBase64));

    const updatedData = {
      ...estudioData,
      studioImages: [...(estudioData.studioImages || []), ...base64Files],
    };

    try {
      const response = await fetch(
        `https://complexobackend.onrender.com/usuarios/${estudioData.studioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("estudio", JSON.stringify(data));
        setEstudioData(data);
        alert("Fotos adicionadas com sucesso na galeria!");
      } else {
        const errorData = await response.json();
        alert(`Erro ao atualizar galeria: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar galeria:", error);
      alert("Erro ao conectar com o servidor para atualizar a galeria.");
    }
  };



  const stats = {
    artistas: estudioData.artistStudio?.length || 0,
    fotos: estudioData.studioImages?.length || 0,
    avaliacao: 0.0 
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Meu Perfil</h1>
          <p className="text-slate-600">Gerencie as informações do seu estúdio de tatuagem</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex flex-col items-center mb-6">
                {estudioData.profilePictureBase64 ? (
                  <img
                    src={estudioData.profilePictureBase64}
                    alt="Logo do estúdio"
                    className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                    S
                  </div>
                )}
                <h3 className="font-semibold text-slate-800 text-lg">
                  {estudioData.studioName}
                </h3>
                <p className="text-slate-500 text-sm">Estúdio de Tatuagem</p>
              </div>

              <nav className="space-y-2">
                {abas.map((aba) => (
                  <button
                    key={aba.id}
                    onClick={() => {
                      if (aba.id === "perfilpublico") {
                        navigate(`/perfil-publico/${estudioData.studioId}`);
                      } else {
                        setAbaAtiva(aba.id);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      abaAtiva === aba.id
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <span className="font-medium">{aba.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>


          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">

              <div className="flex items-center gap-4 mb-8">
                {estudioData.profilePictureBase64 ? (
                  <img
                    src={estudioData.profilePictureBase64}
                    alt="Logo do estúdio"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center text-slate-600 font-bold text-xl">
                    S
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {estudioData.studioName}
                  </h2>
                  <p className="text-slate-600">{estudioData.studioEmail}</p>
                  <div className="text-slate-500 text-sm mt-2">
                    {estudioData.studioAdress}
                  </div>
                </div>
              </div>


              {abaAtiva === "informacoes" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">
                          D
                        </div>
                        <h3 className="font-semibold text-slate-800">Descrição</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {estudioData.studioDescription}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold">
                          @
                        </div>
                        <h3 className="font-semibold text-slate-800">Instagram</h3>
                      </div>

                      {estudioData.studioInstagram && (
                        <a
                          href={`https://instagram.com/${estudioData.studioInstagram.replace(/^@/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                        >
                          @{estudioData.studioInstagram.replace(/^@/, '')}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-6">Estatísticas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          {stats.artistas}
                        </div>
                        <div className="text-slate-600 font-medium">Artistas</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {stats.fotos}
                        </div>
                        <div className="text-slate-600 font-medium">Fotos na Galeria</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {stats.avaliacao}
                        </div>
                        <div className="text-slate-600 font-medium">Avaliação</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-lg text-black mb-2">
                          Pronto para atualizar seu perfil?
                        </h4>
                        <p className="text-primary-100 text-black">
                          Mantenha suas informações sempre atualizadas para atrair mais clientes.
                        </p>
                      </div>
                      <button
                        onClick={() => setAbaAtiva("editar")}
                        className="text-black bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Editar Perfil
                      </button>
                    </div>
                  </div>
                </>
              )}

              {abaAtiva === "galeria" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-slate-800">
                      Galeria do Estúdio
                    </h3>
                    <label className="cursor-pointer bg-primary-600 text-black font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Adicionar Fotos
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {estudioData.studioImages?.length > 0 ? (
                      estudioData.studioImages.map((foto, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-xl shadow-md">
                          <img src={foto} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-slate-400 text-xl">
                          🖼️
                        </div>
                        <p className="text-slate-600">Nenhuma foto na galeria ainda</p>
                      </div>
                    )}
                  </div>
                </div>
              )}


              {abaAtiva === "artistas" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-slate-800">Artistas</h3>
                    <button
                      onClick={() => setShowAddArtistForm(!showAddArtistForm)}
                      className="bg-primary-600 text-black font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      {showAddArtistForm ? "Cancelar" : "Adicionar Artista"}
                    </button>
                  </div>

                  {showAddArtistForm && (
                    <div className="bg-slate-50 p-6 rounded-xl mb-8">
                      <h3 className="text-slate-800 text-lg font-semibold mb-4">Novo artista</h3>
                      <form onSubmit={handleAddArtist} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nome
                          </label>
                          <input
                            type="text"
                            name="nome"
                            value={newArtistFormData.nome}
                            onChange={handleNewArtistChange}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Estilo
                          </label>
                          <select
                            name="estilo"
                            value={newArtistFormData.estilo}
                            onChange={handleNewArtistChange}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Descrição
                          </label>
                          <textarea
                            name="descricao"
                            value={newArtistFormData.descricao}
                            onChange={handleNewArtistChange}
                            rows="2"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Instagram <span className="text-slate-500 text-xs">(apenas o @nome_de_usuario)</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
                            <input
                              type="text" 
                              name="instagram"
                              value={newArtistFormData.instagram}
                              onChange={handleNewArtistChange}
                              placeholder="nome_de_usuario" 
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-8" 
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Biografia
                          </label>
                          <textarea
                            name="biografia"
                            value={newArtistFormData.biografia}
                            onChange={handleNewArtistChange}
                            rows="3"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          ></textarea>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Fotos do Artista (Máx. 5)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleNewArtistPhotoUpload}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                          />
                          {newArtistFormData.fotos.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {newArtistFormData.fotos.map((imgBase64, idx) => (
                                <img
                                  key={idx}
                                  src={imgBase64}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-2">
                          <button
                            type="submit"
                            className="text-black bg-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            Salvar Artista
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {estudioData.artistStudio?.length > 0 ? (
                      estudioData.artistStudio.map((artist, index) => (
                        <div key={artist.artistId || index} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start gap-4 mb-4">
                            {artist.artistImages?.[0] ? (
                              <img
                                src={artist.artistImages[0]}
                                alt={artist.artistName}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                                👤
                              </div>
                            )}
                            <div>
                              <h4 className="font-bold text-slate-800">{artist.artistName}</h4>
                              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-block mt-1">
                                {artist.artistStyle}
                              </div>
                            </div>
                          </div>

                          <p className="text-slate-600 mb-4">{artist.artistDescription}</p>

                          {artist.instagramLink && (
                            <a
                              href={`https://instagram.com/${artist.instagramLink.replace(/^@/, '')}`} // Garante link correto
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary-600 hover:text-primary-700 font-medium mb-3 block"
                            >
                              @{artist.instagramLink.replace(/^@/, '')} {/* Exibe com @ */}
                            </a>
                          )}

                          {artist.artistImages?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {artist.artistImages.slice(0, 3).map((foto, i) => (
                                <img
                                  key={i}
                                  src={foto}
                                  alt={`Foto ${i + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => handleRemoveArtist(artist.artistId)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                            >
                              Remover Artista
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-slate-400 text-xl">
                          👥
                        </div>
                        <p className="text-slate-600 mb-4">Nenhum artista cadastrado</p>
                        <button
                          onClick={() => setShowAddArtistForm(true)}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 mx-auto"
                        >
                          Adicionar primeiro artista
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {abaAtiva === "editar" && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Editar Dados do Estúdio</h3>
                  <form onSubmit={handleUpdateEstudio} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Foto de Perfil
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {editProfilePictureBase64 ? (
                              <img
                                src={editProfilePictureBase64}
                                alt="Pré-visualização"
                                className="w-20 h-20 rounded-xl object-cover border border-slate-300"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                                🖼️
                              </div>
                            )}
                            <input
                              type="file"
                              id="profilePicture"
                              accept="image/*"
                              onChange={handleProfilePictureChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="profilePicture"
                              className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                            >
                              Alterar foto
                            </label>
                            <p className="text-sm text-slate-500 mt-1">Formatos: JPG, PNG</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="studioName" className="block text-sm font-medium text-slate-700 mb-1">
                          Nome do Estúdio
                        </label>
                        <input
                          type="text"
                          id="studioName"
                          value={editStudioName}
                          onChange={(e) => setEditStudioName(e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="studioInstagram" className="block text-sm font-medium text-slate-700 mb-1">
                          Instagram <span className="text-slate-500 text-xs">(apenas o @nome_de_usuario)</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
                          <input
                            type="text"
                            id="studioInstagram"
                            value={editStudioInstagram}
                            onChange={(e) => setEditStudioInstagram(e.target.value.replace(/^@/, ''))}
                            placeholder="nome_de_usuario"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 pl-8"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="studioDescription" className="block text-sm font-medium text-slate-700 mb-1">
                          Descrição do Estúdio
                        </label>
                        <textarea
                          id="studioDescription"
                          value={editStudioDescription}
                          onChange={(e) => setEditStudioDescription(e.target.value)}
                          rows="4"
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="bg-primary-600 text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
{/*CONFERENCIA*/}
export default PerfilEstudio;