import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const StatusContext = createContext();

export const useStatus = () => {
    return useContext(StatusContext);
};

export const StatusProvider = ({ children }) => {
    const [guests, setGuests] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/guests', {
                    withCredentials: true,
                });
                const { statuses, guests } = response.data;
                setStatuses(statuses);
                setGuests(guests);
            } catch (err) {
                setError('Error al obtener los datos.');
                console.error(err);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, []);

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
        <StatusContext.Provider value={{ guests, statuses, error, changeGuestStatus }}>
            {children}
        </StatusContext.Provider>
    );
};