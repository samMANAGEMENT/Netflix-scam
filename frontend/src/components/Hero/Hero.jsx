import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function Hero() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/signup');
    }, 1000); 
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-4">
      {loading ? (
        <Spinner /> // Muestra el spinner si loading es true
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
            Películas, series ilimitadas y mucho más
          </h1>
          <h2 className="text-sm sm:text-xs text-center mb-10">
            A partir de $ 16.900. Cancela cuando quieras.
          </h2>
          <button 
            className="bg-[#e50914] text-white text-lg font-bold py-2 px-4 w-full sm:w-56 rounded-sm max-w-md mb-14"
            onClick={handleClick}
          >
            Reinicia tu membresía
          </button>
        </>
      )}
    </div>
  );
}

export default Hero;
