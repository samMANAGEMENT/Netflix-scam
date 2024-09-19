import React, { useState } from 'react';
import IMG1 from './img/Davivienda_Logo-removebg-preview.png'

const OTP = () => {
    const [otp, setOtp] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handleSendClick = () => {
        if (otp.length > 5) {
            // Replace with actual API call
            console.log('Sending OTP:', otp);
            setShowMessage(false);
        } else {
            setShowMessage(true);
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
        setShowMessage(false);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-[#6D6E72] shadow-md rounded-lg">
            <img src={IMG1} alt="Logo" className="w-auto mx-auto" />
            <hr className="my-4" />
            <div className="text-center">
                <h1 className="text-xl font-bold text-black">Autenticación de compra</h1>
                <p className="mt-2 text-white">
                    Davivienda le envío un código de confirmación para continuar con el proceso de compra. Por favor digítelo.
                </p>
                <p className="mt-2 text-black">
                    Para recibir un nuevo código por favor haga click en REENVIAR CODIGO
                </p>
            </div>
            <div className="text-center mt-4">
                <h2 htmlFor="txtOTP" className="block text-black font-bold">Código de verificación</h2>
                <input
                    type="text"
                    id="txtOTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className={`mt-2 border ${showMessage ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 w-full`}
                    required
                    minLength="6"
                />
                {showMessage && <p className="text-red-500 mt-1">Por favor ingrese un código válido.</p>}
                <button
                    onClick={handleSendClick}
                    className="custom-button"
                >
                    ENVIAR
                </button>
            </div>
            <div className="text-center mt-4">
                <button className="text-blue-500 font-bold">REENVIAR CÓDIGO</button>
                <div className="">
                    <a className="pt-5" href="https://comunicaciones.davivienda.com/Tia-segura-tips/utmdavivienda-principal-banner&utm_medium=redirected&utm_campaign=tia-segura_slf&utm_content=noviembre-2021_banner_na&utm_term=na/">¿Necesita Ayuda?</a>
                </div>
            </div>
        </div>
    );
};

export default OTP;
