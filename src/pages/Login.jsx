import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://complexobackend.onrender.com/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        login(email);
        navigate("/");
        console.log("Login feito com sucesso!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
      } else {
        setErrorMessage("Ocorreu um erro ao fazer login. Tente novamente.");
      }
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 mt-[-10vh]">
      <div className="max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          INICIAR SESSÃO
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 mb-4"
            required
          />

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 mb-4"
            required
          />

          <div className="text-center mb-4">
            <Link
              to="/esqueci-senha"
              className="text-sm text-gray-500 hover:underline"
            >
              Esqueci a senha
            </Link>
          </div>

          <div className="text-center mb-6">
            <Link
              to="/cadastro"
              className="text-sm text-gray-500 hover:underline"
            >
              Não tem uma conta? Cadastre-se
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
          >
            INICIAR SESSÃO
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
