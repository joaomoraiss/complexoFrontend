import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studioName, setStudioName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      setIsAuthenticated(true);
      setUserEmail(email);
      fetchStudioDetails(email);
    }
  }, []);

  const login = async (email) => {
    localStorage.setItem("email", email);
    setIsAuthenticated(true);
    setUserEmail(email);
    await fetchStudioDetails(email);
  };

  const logout = () => {
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setStudioName("");
    setUserEmail("");
  };

  const fetchStudioDetails = async (email) => {
    try {
      const response = await axios.get(
        `https://complexobackend.onrender.com/usuarios/email/${email}`
      );
      if (response.status === 200) {
        setStudioName(response.data.studioName);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do estúdio:", error);
      setStudioName("Usuário");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        studioName,
        userEmail,
        login,
        logout,
        setStudioName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
