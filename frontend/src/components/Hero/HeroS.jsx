import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckIcon = () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#e50914" strokeWidth="2" />
        <path d="M7 12l4 4 8-8" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HeroS = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/signup/planform'); // Reemplaza '/ruta-destino' con la URL a la que deseas redirigir
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            textAlign: 'center',
            paddingTop: '100px', 
            paddingLeft: '50px',
            padding: '20px',
            height: '100vh',
            boxSizing: 'border-box'
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                textAlign: 'left',
                width: '100%',
                maxWidth: '600px'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <CheckIcon />
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ display: 'block', fontWeight: '', marginBottom: '10px' }}>
                            Paso <b>1</b> de <b>2</b>
                        </span>
                        <h1 style={{ fontSize: '2.5rem', lineHeight: '1', margin: 0 }}>
                            ¡Qué bueno que volviste!
                        </h1>
                    </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="#e50914"></path>
                        </svg>
                        <span style={{ marginLeft: '10px' }}>Sin compromisos, cancela cuando quieras.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="#e50914"></path>
                        </svg>
                        <span style={{ marginLeft: '10px' }}>Todo Netflix a un bajo costo.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="#e50914"></path>
                        </svg>
                        <span style={{ marginLeft: '10px' }}>Disfruta sin límites en todos tus dispositivos.</span>
                    </li>
                </ul>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <button 
                        onClick={handleClick} 
                        style={{ 
                            padding: '10px 20px', 
                            fontSize: '1rem', 
                            backgroundColor: '#e50914', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px', 
                            width: '90%' 
                        }}
                    >
                        SIGUIENTE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroS;
