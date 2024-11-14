import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 mt-[-10vh]">
      <div className="max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          INICIAR SESSÃO
        </h2>

        <form>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail:
          </label>
          <input
            type="email"
            id="email"
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 mb-4"
            required
          />

          <div className="text-center mb-4">
            <Link
              to="/esqueci-senha"
              className="text-sm text-gray-500 hover:underline"
            >
              esqueci a senha
            </Link>
          </div>

          <div className="text-center mb-6">
            <Link
              to="/cadastro"
              className="text-sm text-gray-500 hover:underline"
            >
              não tem uma conta? cadastre-se
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
