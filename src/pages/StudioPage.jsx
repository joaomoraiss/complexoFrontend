import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaInstagram, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const StudioPage = () => {
  const { id } = useParams();
  const [studio, setStudio] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudioData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados do estúdio
        const studioRes = await fetch(`https://complexobackend.onrender.com/usuarios/${id}`);
        if (!studioRes.ok) throw new Error('Erro ao carregar estúdio');
        const studioData = await studioRes.json();
        setStudio(studioData);
        
        // Buscar artistas do estúdio
        const artistsRes = await fetch(`https://complexobackend.onrender.com/artistas/studio/${id}`);
        if (!artistsRes.ok) throw new Error('Erro ao carregar artistas');
        const artistsData = await artistsRes.json();
        setArtists(artistsData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudioData();
  }, [id]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 }
  };

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 z-10"
      style={{ fontSize: '2rem' }}
    >
      &#8249;
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 z-10"
      style={{ fontSize: '2rem' }}
    >
      &#8250;
    </button>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Carregando estúdio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Estúdio não encontrado</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      {/* Cabeçalho com informações principais */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {/* Imagem de perfil */}
        <div className="flex-shrink-0">
          {studio.profilePictureBase64 ? (
            <img 
              src={studio.profilePictureBase64} 
              alt={studio.studioName} 
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-48 h-48 flex items-center justify-center">
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Informações do estúdio */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-4">
            {studio.studioName}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {studio.studioDescription && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                <p className="text-gray-700">{studio.studioDescription}</p>
              </div>
            )}
            
            {studio.studioAdress && (
              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Endereço
                </h2>
                <p className="text-gray-700">{studio.studioAdress}</p>
              </div>
            )}
            
            {studio.studioInstagram && (
              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <FaInstagram className="mr-2" /> Instagram
                </h2>
                <a
                  href={`https://instagram.com/${studio.studioInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @{studio.studioInstagram}
                </a>
              </div>
            )}
            
            {studio.studioEmail && (
              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <FaEnvelope className="mr-2" /> Email
                </h2>
                <a
                  href={`mailto:${studio.studioEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {studio.studioEmail}
                </a>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/studio/${id}/agendamento`} 
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Agendar Tatuagem
            </Link>
          </div>
        </div>
      </div>

      {/* Galeria de fotos do estúdio */}
      {studio.studioImages && studio.studioImages.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Galeria do Estúdio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {studio.studioImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img 
                  src={image} 
                  alt={`Foto do estúdio ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção de Artistas */}
      {artists.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Artistas</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <Carousel
              responsive={responsive}
              infinite={artists.length > 5}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px px-4"
            >
              {artists.map((artist) => (
                <div key={artist.artistId} className="flex flex-col items-center">
                  {/* Imagem do artista */}
                  {artist.artistImages && artist.artistImages.length > 0 ? (
                    <img 
                      src={artist.artistImages[0]} 
                      alt={artist.artistName} 
                      className="w-32 h-32 rounded-full object-cover border-2 border-white shadow-md mb-4" 
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 flex items-center justify-center mb-4">
                      <span className="text-gray-500 text-sm">Sem imagem</span>
                    </div>
                  )}
                  
                  {/* Nome e estilo */}
                  <div className="text-center">
                    <Link 
                      to={`/artista/${artist.artistId}`} 
                      className="text-lg font-semibold hover:underline"
                    >
                      {artist.artistName}
                    </Link>
                    {artist.artistStyle && (
                      <p className="text-gray-600 mt-1">{artist.artistStyle}</p>
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}

      {/* Informações adicionais */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sobre o Estúdio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studio.dateOfBirth && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Ano de Fundação</h3>
              <p>{new Date(studio.dateOfBirth).getFullYear()}</p>
            </div>
          )}
          
          {studio.studioLocation && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Localização</h3>
              <p>{studio.studioLocation}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Contato</h3>
            <p>
              {studio.studioEmail && (
                <a 
                  href={`mailto:${studio.studioEmail}`} 
                  className="text-blue-600 hover:underline block mb-2"
                >
                  {studio.studioEmail}
                </a>
              )}
              {studio.studioInstagram && (
                <a 
                  href={`https://instagram.com/${studio.studioInstagram}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block"
                >
                  @{studio.studioInstagram}
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;