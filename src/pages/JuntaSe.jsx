import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const JuntaSe = () => {
  const [role, setRole] = useState("CLIENTE");
  const [formData, setFormData] = useState({
    foto: null, 
    nome: "",
    endereco: "",
    dataNascimento: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    descricao: "",
    instagram: "",
    artistas: [], 
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const base64 = await toBase64(file);
      setFormData((prev) => ({ ...prev, [name]: base64 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const addArtist = () => {
    if (formData.artistas.length < 10) {
      setFormData((prev) => ({
        ...prev,
        artistas: [...prev.artistas, { nome: "", estilo: "", descricao: "", fotos: [], instagram: "" }],
      }));
    }
  };

  const handleArtistChange = (index, field, value) => {
    const newArtists = [...formData.artistas];
    newArtists[index][field] = value;
    setFormData((prev) => ({ ...prev, artistas: newArtists }));
  };

  const handleArtistPhotoUpload = async (index, files) => {
    const newArtists = [...formData.artistas];
    const base64Files = await Promise.all(Array.from(files).slice(0, 5).map(toBase64));
    newArtists[index].fotos = base64Files;
    setFormData((prev) => ({ ...prev, artistas: newArtists }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("Senhas diferentes");
      return;
    }

    const userPayload = {
      profilePictureBase64: formData.foto,
      studioName: formData.nome,
      studioAdress: formData.endereco,
      studioEmail: formData.email,
      studioPassword: formData.senha,
      role: role,
    };

    if (role === "STUDIO") {
      userPayload.studioDescription = formData.descricao;
      userPayload.studioInstagram = formData.instagram;
      userPayload.artistStudio = formData.artistas.map((artist) => ({
        artistName: artist.nome,
        artistStyle: artist.estilo,
        artistDescription: artist.descricao,
        instagramLink: artist.instagram,
        artistImages: artist.fotos,
      }));
    }

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro detalhado da resposta do backend:', errorText);
        let errorMessage = 'Erro ao cadastrar. Tente novamente.';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
        }
        alert('Erro ao cadastrar: ' + errorMessage);
        return;
      }

      // Sucesso
      const data = await response.json();
      console.log('Cadastro bem-sucedido:', data);
      localStorage.setItem(role === "CLIENTE" ? "cliente" : "estudio", JSON.stringify(data));
      navigate(role === "CLIENTE" ? "/perfil-usuario" : "/perfil-estudio");

    } catch (error) {
      console.error('Erro de conexão ou requisição:', error); // Loga o erro de rede completo
      alert('Erro de conexão com o servidor. Verifique se o backend está rodando: ' + error.message);
    }
  };


  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Junte-se ao Complexo</h2>
      <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
          <div className="flex">
            <button
              type="button"
              onClick={() => setRole("CLIENTE")}
              className={`px-6 py-2 rounded-l-md border border-gray-300 ${
                role === "CLIENTE" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
              } focus:outline-none`}
            >
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setRole("STUDIO")}
              className={`px-6 py-2 rounded-r-md border border-gray-300 ${
                role === "STUDIO" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
              } focus:outline-none`}
            >
              Estúdio
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Foto:</label>
          <input type="file" name="foto" onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nome:</label>
          <input name="nome" value={formData.nome} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Endereço:</label>
          <input name="endereco" value={formData.endereco} onChange={handleChange} className="w-full border p-2 rounded" required />

        </div>

        {role === "CLIENTE" && (
          <div className="mb-4">
            <label className="block mb-1">Data de Nascimento:</label>
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
        )}

        {role === "STUDIO" && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Descrição:</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Instagram:</label>
              <input name="instagram" value={formData.instagram} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2">Artistas</h3>
              {formData.artistas.map((artist, index) => (
                <div key={index} className="border p-3 rounded mb-3">
                  <input type="text" placeholder="Nome do Artista" value={artist.nome} onChange={(e) => handleArtistChange(index, "nome", e.target.value)} className="w-full border p-2 mb-2 rounded" />
                  <select className="w-full border p-2 mb-2 rounded" value={artist.estilo} onChange={(e) => handleArtistChange(index, "estilo", e.target.value)}>
                    <option value="">Selecione o estilo</option>
                    <option value="realista">Realista</option>
                    <option value="aquarela">Aquarela</option>
                    <option value="pontilhismo">Pontilhismo</option>
                  </select>
                  <textarea placeholder="Descrição" className="w-full border p-2 mb-2 rounded" value={artist.descricao} onChange={(e) => handleArtistChange(index, "descricao", e.target.value)} />
                  <input type="file" multiple accept="image/*" onChange={(e) => handleArtistPhotoUpload(index, e.target.files)} className="mb-2" />
                  <input type="text" placeholder="Instagram do artista" className="w-full border p-2 rounded" value={artist.instagram} onChange={(e) => handleArtistChange(index, "instagram", e.target.value)} />
                </div>
              ))}
              <button type="button" onClick={addArtist} className="bg-blue-500 text-white px-3 py-1 rounded">
                Adicionar Artista
              </button>
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Senha:</label>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Confirmar Senha:</label>
          <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="flex items-center justify-center mb-4">
          <input type="checkbox" id="terms" className="h-4 w-4 text-gray-600" required />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            Aceito os{" "}
            <a href="/termos" className="text-blue-500 underline">
              termos de uso
            </a>{" "}
            da plataforma
          </label>
        </div>

        <div className="text-center mb-4">
          <Link to="/iniciar-sessao" className="text-sm text-gray-500 hover:underline">
            Já tem uma conta? Faça login
          </Link>
        </div>

        <button type="submit" className="w-full bg-black text-white p-3 rounded hover:bg-gray-900">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default JuntaSe;