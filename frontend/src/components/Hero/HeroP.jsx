import React from 'react';
import PlanCards from '../PlanCards/PlanCards';

function HeroP() {
    return (
        <div className="container mx-auto px-4 py-6 mt-2.5">
            <span className="block mb-2.5 text-center">
                Paso <b>1</b> de <b>2</b>
            </span>
            <h1 className="text-3xl font-bold leading-none text-center mb-4">
                Selecciona el plan ideal para ti
            </h1>
            <ul className="list-none p-0 mb-5">
                <li className="flex items-center mb-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="text-red-600">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path>
                    </svg>
                    <span className="ml-2.5">Sin compromisos, cancela cuando quieras.</span>
                </li>
                <li className="flex items-center mb-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="text-red-600">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path>
                    </svg>
                    <span className="ml-2.5">Todo Netflix a un bajo costo.</span>
                </li>
                <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="text-red-600">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path>
                    </svg>
                    <span className="ml-2.5">Disfruta sin límites en todos tus dispositivos.</span>
                </li>
            </ul>

            <h1
                class="
    text-center 
    text-4xl 
    font-bold 
    bg-gradient-to-r 
    from-red-600 
    to-black 
    bg-clip-text 
    text-transparent 
    animate-pulse 
    hover:animate-bounce 
    transition-all 
    duration-500 
    ease-in-out 
    py-4 
    hover:scale-105
  "
            >
                
                ¡Renueva tu membresía con el 70% de descuento!
            </h1>

            <PlanCards />
        </div>
    );
}

export default HeroP;
