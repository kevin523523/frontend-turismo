import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './CardListReservations.css'
const CardListReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchReservations = async () => {
    const userId = sessionStorage.getItem('user_id');
    if (!userId) {
      setError('Usuario no autenticado');
      setTimeout(() => navigate('/api/sign'), 3000); 
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5500/index.php?action=show_available_reservations&user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.message);
        setTimeout(() => navigate('/api/sign'), 3000); 
        return;
      }

      if (data.routes_reservations) {
        setReservations(Object.values(data.routes_reservations));
      } else {
        setError('No hay reservas.');
      }

    } catch (error) {
      setError('Error al obtener las reservas: ' + error.message);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancelReservation = async (id) => {
    try {
      const userId = sessionStorage.getItem('user_id');
      const response = await fetch(`http://127.0.0.1:5500/index.php?action=cancel&route_id=${id}&user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Reserva cancelada con éxito.');
        await fetchReservations();
      } else {
        alert('Error al cancelar la reserva: ' + data.message);
      }

    } catch (error) {
      alert('Error al cancelar la reserva: ' + error.message);
    }
  };

  return (
    <div className="card-list-reservations">
      {error && <p className="text-red-600">{error}</p>}
      {reservations.length > 0 ? (
        reservations.map(reservation => (
          <div key={reservation.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow card-detail-reservations">
            <img src={reservation.image_url} alt={reservation.name} className="rounded-t-lg card-image-detail-reservations" />
            <div className="p-3">
              <h2 className="card-title">{reservation.name}</h2>
              <button 
                onClick={() => handleCancelReservation(reservation.id)}
                className="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800"
              >
                Cancelar Reserva
              </button>
            </div>
          </div>
        ))
      ) : (
        !error && <p className="text-gray-500">No hay reservas.</p>
      )}
    </div>
  );
};

export default CardListReservations;
