import React, { useState } from "react";
import { useParams } from "react-router-dom";

const HomePrivate = () => {
  const { username } = useParams(); // Obtendo o nome de usuário da URL

  const [studioName, setStudioName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [artists, setArtists] = useState([]);

  // Função para adicionar um novo artista
  const addArtist = () => {
    if (artists.length < 10) {
      setArtists([...artists, { name: "", photos: [] }]);
    } else {
      alert("Você pode adicionar no máximo 10 artistas.");
    }
  };

  // Função para atualizar o nome do artista
  const handleArtistNameChange = (index, value) => {
    const updatedArtists = [...artists];
    updatedArtists[index].name = value;
    setArtists(updatedArtists);
  };

  // Função para adicionar fotos para um artista
  const handleArtistPhotoUpload = (index, files) => {
    const updatedArtists = [...artists];
    updatedArtists[index].photos = Array.from(files).slice(0, 5); // Limite de 5 fotos
    setArtists(updatedArtists);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Bem-vindo(a), {username}!
      </h1>
      <p className="mb-6 text-gray-600 text-lg">
        Este é o conteúdo exclusivo para membros logados.
      </p>

      <form className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        {/* Nome do Estúdio */}
        <div className="mb-4">
          <label htmlFor="studioName" className="block text-gray-700 font-medium mb-2">
            Nome do Estúdio:
          </label>
          <input
            type="text"
            id="studioName"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
        </div>

        {/* Adicionar logomarca */}
        <div className="mb-4">
          <label htmlFor="logo" className="block text-gray-700 font-medium mb-2">
            Adicionar Logomarca:
          </label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Descrição:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          ></textarea>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
        </div>

        {/* Telefone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Telefone para contato:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
        </div>

        {/* Endereço */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Endereço:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
        </div>

        {/* Link para o Instagram */}
        <div className="mb-4">
          <label htmlFor="instagramLink" className="block text-gray-700 font-medium mb-2">
            Link para o Instagram:
          </label>
          <input
            type="url"
            id="instagramLink"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
        </div>

        {/* Cadastrar Artistas */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cadastrar Artistas</h2>

          {artists.map((artist, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-md mb-4">
              <div className="mb-4">
                <label htmlFor={`artistName-${index}`} className="block text-gray-700 font-medium mb-2">
                  Nome do Artista:
                </label>
                <input
                  type="text"
                  id={`artistName-${index}`}
                  value={artist.name}
                  onChange={(e) => handleArtistNameChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`artistPhotos-${index}`} className="block text-gray-700 font-medium mb-2">
                  Adicionar Fotos (máximo de 5):
                </label>
                <input
                  type="file"
                  id={`artistPhotos-${index}`}
                  accept="image/*"
                  multiple
                  onChange={(e) => handleArtistPhotoUpload(index, e.target.files)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addArtist}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Adicionar Artista
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePrivate;



