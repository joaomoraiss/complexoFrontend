import React from "react";
import { useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("cliente"));

  if (!userData) {
    return <p className="text-center mt-10">Nenhum dado de cliente encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Perfil do Cliente</h2>

      <div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-lg">
        {userData.foto && (
          <img
            src={userData.foto}
            alt="Foto do cliente"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        )}
        <p><strong>Nome:</strong> {userData.nome}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Endereço:</strong> {userData.endereco}</p>
        <p><strong>Data de nascimento:</strong> {userData.dataNascimento}</p>
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

export default PerfilUsuario;
