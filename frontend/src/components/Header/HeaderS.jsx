import React from 'react';
import SVG1 from '../../../src/assets/image_dd555099.png'; // Asegúrate de que la ruta sea correcta

const HeaderS = () => {
  return (
    <header className="flex items-center justify-between p-3 border-b border-gray-400" href="./">
      {/* Image icon */}
      <img
        src={SVG1}
        href="/"
        alt="Icon"
        className="h-6 w-auto" // Ajusta el tamaño de la imagen según lo necesites
      />

      {/* Logout button */}
      <a
        href="/logout" // Cambia esta URL a la que desees
        className="text-[#333] hover:text-[#333] transition-colors duration-300 font-bold"
      >
        Cerrar sesión
      </a>
    </header>
  );
};

export default HeaderS;
