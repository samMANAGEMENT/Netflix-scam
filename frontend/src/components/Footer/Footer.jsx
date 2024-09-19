import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Columnas de enlaces */}
          <div className="w-full md:w-1/4 mb-6">
            <h5 className="text-lg font-semibold mb-4">¿Preguntas? Llama al 01 800 917 1564</h5>
            <ul>
              <li><a href="https://help.netflix.com/support/412" className="hover:underline">Preguntas frecuentes</a></li>
              <li><a href="https://help.netflix.com" className="hover:underline">Centro de ayuda</a></li>
              <li><a href="https://www.netflix.com/youraccount" className="hover:underline">Cuenta</a></li>
              <li><a href="https://media.netflix.com" className="hover:underline">Prensa</a></li>
              <li><a href="http://ir.netflix.com/" className="hover:underline">Empleo</a></li>
              <li><a href="https://www.netflix.com/redeem" className="hover:underline">Canjear tarjetas de regalo</a></li>
              <li><a href="https://www.netflix.com/gift-cards" className="hover:underline">Comprar tarjetas de regalo</a></li>
              <li><a href="https://www.netflix.com/watch" className="hover:underline">Formas de ver</a></li>
              <li><a href="https://help.netflix.com/legal/termsofuse" className="hover:underline">Términos de uso</a></li>
              <li><a href="https://help.netflix.com/legal/privacy" className="hover:underline">Privacidad</a></li>
              <li><a href="#" className="hover:underline">Preferencias de cookies</a></li>
              <li><a href="https://help.netflix.com/legal/corpinfo" className="hover:underline">Contáctanos</a></li>
              <li><a href="https://fast.com" className="hover:underline">Prueba de velocidad</a></li>
              <li><a href="https://help.netflix.com/legal/notices" className="hover:underline">Avisos legales</a></li>
              <li><a href="https://www.netflix.com/co/browse/genre/839338" className="hover:underline">Solo en Netflix</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
          <p className="text-sm">&copy; Netflix Colombia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
