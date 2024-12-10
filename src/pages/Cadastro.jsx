import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificando se as senhas são iguais
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Salvar os dados do usuário no localStorage
    localStorage.setItem("user", JSON.stringify({ name, email }));

    // Redirecionar para a HomePrivate com o nome do usuário na URL
    navigate(`/home-private/${name}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Faça parte do Complexo</h2>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Estúdio/Tatuador:
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirma senha:
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-center mb-4">
          <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 text-gray-600"
          required
        />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
          Aceito os {" "}
          <a href="/termos" className="text-blue-500 underline">
          termos de uso
          </a>{" "}
          da plataforma
        </label>
      </div>

        <div className="text-center mb-4">
          <Link
            to="/iniciar-sessao"
            className="text-sm text-gray-500 hover:underline"
          >
            Já tem uma conta? Faça login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
};

export default Cadastro;


