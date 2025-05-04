import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // Novo estado para o tipo de usuário
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setErrorMessage("Selecione o tipo de conta (Cliente ou Estúdio).");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("E-mail inválido!");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const endpoint =
      role === "STUDIO"
        ? "http://localhost:8080/auth/register/studio"
        : "http://localhost:8080/auth/register/cliente";

    try {
      const response = await axios.post(
        endpoint,
        {
          email: email,
          password: password,
          role: role,
          nomeEstudio: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/iniciar-sessao"), 2000);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrorMessage(
        error.response?.data || "Erro ao realizar o cadastro. Tente novamente."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Faça parte do Complexo</h2>

      {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}
      {successMessage && <div className="mb-4 text-green-500 text-center">{successMessage}</div>}

      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        {/* Seleção de Tipo */}
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

        {/* Inputs */}
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Estúdio/Cliente
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
          Confirme a senha:
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
            Aceito os{" "}
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
