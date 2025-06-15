import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className="container mx-auto px-8 py-12">
      {/* Cabeçalho com nome sublinhado */}
      <div className="flex items-center mb-4 space-x-6">
        <h1 className="text-3xl font-bold underline">
          {studio.studioName}
        </h1>
        <p className="text-lg underline ml-8 flex items-center">
          contato:
          {studio.studioInstagram && (
            <a
              href={studio.studioInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 hover:text-black ml-2"
            >
              <FaInstagram />
            </a>
          )}
        </p>
      </div>
      
      <div className="flex flex-col items-start md:flex-row md:justify-between mb-16">
        <div className="md:w-1/2 text-sm mb-4 md:mb-0">
          <p>
            {studio.studioDescription || 'Descrição não disponível.'}
          </p>
          <div className="mt-4">
            <Link to={`/studio/${id}/informacoes`} className="underline font-bold text-lg">
              MAIS INFORMAÇÕES
            </Link>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt className="mr-2" />
              <Link to={`/studio/${id}/localizacao`} className="text-sm">
                como chegar
              </Link>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 md:w-1/2">
          {/* Exibição das imagens do estúdio */}
          {studio.studioImages && studio.studioImages.length > 0 ? (
            studio.studioImages.slice(0, 3).map((image, index) => (
              <div key={index} className="w-1/3">
                {image.profilePictureBase64 ? (
                  <img 
                    src={`data:image/jpeg;base64,${image.profilePictureBase64}`} 
                    alt={`Estúdio ${index + 1}`} 
                    className="h-48 w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                )}
              </div>
            ))
          ) : (
            // Placeholders se não houver imagens
            <>
              <div className="w-1/3 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Imagem 1</span>
              </div>
              <div className="w-1/3 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Imagem 2</span>
              </div>
              <div className="w-1/3 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Imagem 3</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Seção de Artistas */}
      <h2 className="text-2xl font-bold text-center mt-16 mb-4">ARTISTAS</h2>
      {artists.length > 0 ? (
        <div className="bg-gray-200 p-4 rounded-lg relative">
          <Carousel
            responsive={responsive}
            infinite={false}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {artists.map((artist) => (
              <div key={artist.artistId} className="flex flex-col items-center">
                {artist.profilePictureBase64 ? (
                  <img 
                    src={`data:image/jpeg;base64,${artist.profilePictureBase64}`} 
                    alt={artist.artistName} 
                    className="w-24 h-24 rounded-full object-cover" 
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                )}
                <Link 
                  to={`/artista/${artist.artistId}`} 
                  className="text-center mt-2 hover:underline"
                >
                  {artist.artistName}
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Nenhum artista encontrado neste estúdio.</p>
      )}
    </div>
  );
};

export default StudioPage;