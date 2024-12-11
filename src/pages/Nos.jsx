import React from "react";
import { FaGithub } from "react-icons/fa"; 

const Nos = () => {
  const teamMembers = [
    {
      photo: "src/assets/integrantes/Breno.png",
      name: "Breno Fernandes",
      role: "Backend Developer",
      github: "https://github.com/breno-fernandes1",
    },
    {
      photo: "src/assets/integrantes/Caio.png",
      name: "Caio Roberto",
      role: "Backend Developer",
      github: "https://github.com/CaioRD",
    },
    {
      photo: "src/assets/integrantes/Céu.jpg",
      name: "Céu de Nascimento",
      role: "Engineer Software",
      github: "https://github.com/ceudenascimento",
    },
    {
      photo: "src/assets/integrantes/Jeff.png",
      name: "Jefferson Marques",
      role: "Front-end Developer",
      github: "https://github.com/jeffmqs",
    },
    {
      photo: "src/assets/integrantes/João.png",
      name: "João Morais",
      role: "Full-Stack Developer",
      github: "https://github.com/joaomoraiss",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-semibold text-center mb-12">Nós</h1>
      <div className="w-full max-w-4xl">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center mb-10 border-b border-gray-300 pb-6"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600 mb-4">{member.role}</p>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black flex items-center space-x-2 hover:underline"
            >
              <FaGithub size={24} className="text-black" />
              <span>GitHub</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nos;
