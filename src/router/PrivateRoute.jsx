import React from "react";
import { useParams } from "react-router-dom";

const HomePrivate = () => {
  const { name } = useParams(); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-4xl font-semibold mb-6">Bem-vindo, {name}!</h1>
    </div>
  );
};

export default HomePrivate;
