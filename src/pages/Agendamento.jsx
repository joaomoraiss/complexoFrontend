import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";

const artistas = ["Alysson", "Biana", "Diniz", "Cisco", "Emanoel"];
const estudios = ["Casa Alfaia", "Studio Canoa", "Borcelle Studio"];

const Agendamento = () => {
  const [artistaSelecionado, setArtistaSelecionado] = useState(null);
  const [estudioSelecionado, setEstudioSelecionado] = useState(null);
  const [itemAdicionado, setItemAdicionado] = useState(null);
  const [mostrarIframe, setMostrarIframe] = useState(false);
  const [popupVisivel, setPopupVisivel] = useState(false);

  const adicionarArtista = () => {
    if (artistaSelecionado) {
      setItemAdicionado({ tipo: "artista", nome: artistaSelecionado });
      setMostrarIframe(false);
    }
  };

  const adicionarEstudio = () => {
    if (estudioSelecionado) {
      setItemAdicionado({ tipo: "estudio", nome: estudioSelecionado });
      setMostrarIframe(false);
    }
  };

  const finalizar = () => {
    setPopupVisivel(true);
    setTimeout(() => setPopupVisivel(false), 3000);
  };

  const iframeLink = itemAdicionado
    ? "https://cal.com/complexo-tatuagem-arte-calvsc/casa-alfaia-agendamento"
    : "";

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center text-3xl font-bold mb-1 pl-4">
          <FaCalendarAlt className="text-black mr-2" />
          Calendário Online
        </div>
        <p className="text-sm text-gray-500 pl-4 mb-4">
          Agendamentos de forma prática e segura
        </p>
        <hr className="border-t border-gray-300 mb-6" />

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-4 border-r border-gray-300">
            <h2 className="text-lg font-bold leading-snug">
              Agende sua sessão
              <br />com o seu artista/<br />estúdio favorito
            </h2>
          </div>

          <div className="w-full md:w-2/3 p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="font-semibold block mb-2">Artistas</label>
                <Listbox value={artistaSelecionado} onChange={setArtistaSelecionado}>
                  <div className="relative">
                    <Listbox.Button className="w-full border p-2 pr-10 rounded bg-white text-left">
                      {artistaSelecionado || "Selecione um artista"}
                      <HiChevronDown className="absolute right-3 top-3 text-gray-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white border rounded shadow z-10">
                      {artistas.map((artista) => (
                        <Listbox.Option
                          key={artista}
                          value={artista}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 ${active ? "bg-gray-100" : ""}`
                          }
                        >
                          {artista}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
                <button
                  onClick={adicionarArtista}
                  className="bg-black text-white px-4 py-1 mt-4 rounded"
                >
                  Adicionar
                </button>
              </div>

              <div className="flex-1">
                <label className="font-semibold block mb-2">Estúdios</label>
                <Listbox value={estudioSelecionado} onChange={setEstudioSelecionado}>
                  <div className="relative">
                    <Listbox.Button className="w-full border p-2 pr-10 rounded bg-white text-left">
                      {estudioSelecionado || "Selecione um estúdio"}
                      <HiChevronDown className="absolute right-3 top-3 text-gray-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white border rounded shadow z-10">
                      {estudios.map((estudio) => (
                        <Listbox.Option
                          key={estudio}
                          value={estudio}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 ${active ? "bg-gray-100" : ""}`
                          }
                        >
                          {estudio}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
                <button
                  onClick={adicionarEstudio}
                  className="bg-black text-white px-4 py-1 mt-4 rounded"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {itemAdicionado && (
              <div className="bg-gray-200 p-4 rounded-md shadow w-full max-w-md mt-4">
                <h3 className="font-bold mb-1">
                  Sessão com {itemAdicionado.tipo === "artista" ? "Artista" : "Estúdio"}
                </h3>
                <p className="whitespace-pre-line">
                  {itemAdicionado.tipo === "artista"
                    ? `${itemAdicionado.nome}\nEstúdio: Casa Alfaia\nTipo de Arte: Tatuagem Realista`
                    : `Estúdio: ${itemAdicionado.nome}`}
                </p>
              </div>
            )}

{itemAdicionado && (
  <div className="mt-6 flex items-center gap-2 text-sm text-black">
    <button
      onClick={() => setMostrarIframe(!mostrarIframe)}
      className="focus:outline-none bg-transparent"
      title="Abrir calendário"
    >
      <FaCalendarAlt className="text-black text-3xl" /> {/* Tamanho ainda maior */}
    </button>
    <span>Visualize os dias com horário disponível</span>
  </div>
)}



            {mostrarIframe && (
              <div className="mt-6 w-full">
                <iframe
                  src={iframeLink}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="Agendamento Cal.com"
                ></iframe>
              </div>
            )}

            {itemAdicionado && (
              <div className="mt-4">
                <button
                  onClick={finalizar}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Finalizar
                </button>
              </div>
            )}

            {popupVisivel && (
              <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
                Agendamento realizado com sucesso!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;

