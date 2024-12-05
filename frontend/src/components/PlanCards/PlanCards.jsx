import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function PlanCards() {
  // Estado para el plan seleccionado, inicializamos en 'basic' (Premium)
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const plans = {
    basic: {
      title: 'Premium',
      description: '4K + HDR',
      details: {
        price: '$ 38.900',
        price2: '$ 11.670',
        audioVideoQuality: 'Óptima',
        resolution: '4K (Ultra HD) + HDR',
        spatialAudio: 'Incluido',
        compatibleDevices: 'TV, computadora, teléfono, tablet',
        simultaneousStreams: '4',
        downloads: '6',
        note: 'La disponibilidad del contenido en HD (720p), Full HD (1080p), Ultra HD (4K) y HDR depende de tu servicio de internet y del dispositivo en uso. No todo el contenido está disponible en todas las resoluciones. Consulta nuestros Términos de uso para obtener más información. Solo las personas que vivan contigo pueden usar tu cuenta. Puedes ver Netflix en 4 dispositivos al mismo tiempo con el plan Premium, en 2 con el plan Estándar y en 1 con el plan Básico.'
      }
    },
    standard: {
      title: 'Estándar',
      description: '1080p',
      details: {
        price: '$ 28.900',
        price2: '$ 8.670',
        audioVideoQuality: 'Alta',
        resolution: '1080p',
        spatialAudio: 'No incluido',
        compatibleDevices: 'TV, computadora, teléfono, tablet',
        simultaneousStreams: '2',
        downloads: '4',
        note: 'La disponibilidad del contenido en HD (720p), Full HD (1080p), Ultra HD (4K) y HDR depende de tu servicio de internet y del dispositivo en uso. No todo el contenido está disponible en todas las resoluciones. Consulta nuestros Términos de uso para obtener más información. Solo las personas que vivan contigo pueden usar tu cuenta. Puedes ver Netflix en 2 dispositivos al mismo tiempo con el plan Estándar y en 1 con el plan Básico.'
      }
    },
    premium: {
      title: 'Básico',
      description: '720p',
      details: {
        price: '$ 18.900',
        price2: '$ 5.670',
        audioVideoQuality: 'Buena',
        resolution: '720p',
        spatialAudio: 'No incluido',
        compatibleDevices: 'TV, computadora, teléfono, tablet',
        simultaneousStreams: '1',
        downloads: '2',
        note: 'La disponibilidad del contenido en HD (720p), Full HD (1080p), Ultra HD (4K) y HDR depende de tu servicio de internet y del dispositivo en uso. No todo el contenido está disponible en todas las resoluciones. Consulta nuestros Términos de uso para obtener más información. Solo las personas que vivan contigo pueden usar tu cuenta. Puedes ver Netflix en 1 dispositivo al mismo tiempo con el plan Básico.'
      }
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan); // Cambia a la selección del plan
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/signup/paymentPicker');
    }, 1000);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(plans).map((plan) => {
          const isSelected = selectedPlan === plan;
          const backgroundColor = isSelected
            ? (plan === 'basic'
              ? 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)'
              : 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)')
            : 'bg-white';

          const textColor = isSelected ? 'text-white' : 'text-black';

          return (
            <div
              key={plan}
              onClick={() => handlePlanSelect(plan)}
              className={`relative cursor-pointer p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105 w-auto flex-shrink-0`}
              style={{ background: backgroundColor }}
            >
              {plan === 'basic' && isSelected && (
                <div className="absolute top-[1px] left-[17px] bg-red-500 text-white text-xs font-bold px-0.5 py-0.5 rounded-lg mb-5">
                  Más Popular
                </div>
              )}
              <h2 className={`text-lg sm:text-xl font-bold ${textColor}`}>
                {plans[plan].title}
              </h2>
              <p className={`mt-2 text-sm sm:text-base text-center ${textColor}`}>
                {plans[plan].description}
              </p>
            </div>
          );
        })}
      </div>

      {selectedPlan && (
  <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs mx-auto mt-6">
    <h2 className="text-xl sm:text-2xl font-bold mb-2">{plans[selectedPlan].title}</h2>
    <p className="text-gray-600 mb-4 text-sm sm:text-base">{plans[selectedPlan].description}</p>
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-lg font-bold text-green-600">
          {plans[selectedPlan].details.price2}
        </p>
        <p className="text-gray-400 line-through">
          {plans[selectedPlan].details.price}
        </p>
      </div>
      <p><strong>Calidad de audio y video:</strong> {plans[selectedPlan].details.audioVideoQuality}</p>
      <p><strong>Resolución:</strong> {plans[selectedPlan].details.resolution}</p>
      <p><strong>Audio espacial (sonido inmersivo):</strong> {plans[selectedPlan].details.spatialAudio}</p>
      <p><strong>Dispositivos compatibles:</strong> {plans[selectedPlan].details.compatibleDevices}</p>
      <p><strong>Dispositivos del hogar en los que se puede ver Netflix al mismo tiempo:</strong> {plans[selectedPlan].details.simultaneousStreams}</p>
      <p><strong>Dispositivos de descarga:</strong> {plans[selectedPlan].details.downloads}</p>
      <p className="mt-2 text-sm text-gray-600">{plans[selectedPlan].details.note}</p>
    </div>
  </div>
)}

      {selectedPlan && (
        <div className="flex justify-center mt-6">
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
      )}

      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default PlanCards;
