import React, { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      setErrorMessage("Por favor, complete o reCAPTCHA.");
      return;
    }

    try {
      const resp = await axios.post(
        `${API_BASE}/auth/login`,
        {
          email,
          password,
          recaptchaToken: captchaValue,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const { user } = resp.data;
      login(user.username); // ou login(email), conforme seu contexto
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err.response.data);
      } else if (err.response?.status === 401) {
        setErrorMessage("E-mail ou senha incorretos.");
      } else {
        setErrorMessage("Erro ao fazer login. Tente novamente.");
      }
      // reseta o reCAPTCHA para uma nova tentativa
      recaptchaRef.current.reset();
      setCaptchaValue(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">INICIAR SESSÃO</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block text-sm font-medium mb-1">E-mail:</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Senha */}
          <label className="block text-sm font-medium mb-1">Senha:</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* reCAPTCHA */}
          <div className="flex justify-center mb-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(val) => setCaptchaValue(val)}
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            INICIAR SESSÃO
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <Link to="/esqueci-senha" className="hover:underline">
              Esqueci a senha
            </Link>
            {" • "}
            <Link to="/cadastro" className="hover:underline">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
