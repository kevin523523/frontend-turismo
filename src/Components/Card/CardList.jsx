// src/CardList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const userId = sessionStorage.getItem('user_id');
      if (!userId) {
        setError('Usuario no autenticado');
        setTimeout(() => navigate('/api/sign'), 3000); 
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5500/index.php?action=show_available&user_id=${userId}`, {
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

        if (data.routes) {
          setCards(Object.values(data.routes));
        } else {
          setError('No hay tarjetas disponibles.');
        }

      } catch (error) {
        setError('Error al obtener las tarjetas: ' + error.message);
      }
    };

    fetchCards();
  }, [navigate]);

  const handleViewMore = (cardId) => {
    navigate(`/card/${cardId}`);
  };

  return (
    <div className="card-list">
      {error && <p className="text-red-600">{error}</p>}
      {cards.length > 0 ? (
        cards.map(card => (
          <div key={card.id} className="card" style={{ 
            backgroundColor: 'white', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '16px', 
            margin: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}>
            <img src={card.image_url} alt={card.name} className="card-image" style={{ width: '200px', height: '200px', borderRadius: '8px' }} />
            <h3 className="card-title" style={{ margin: '8px 0' }}>{card.name}</h3>
            <p className="card-status">Estado: {card.status}</p>
            <p className="card-max-reservations">Máx. Reservas: {card.max_reservations}</p>
            <button 
              onClick={() => handleViewMore(card.id)} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Ver más
            </button>
          </div>
        ))
      ) : (
        !error && <p className="text-gray-500">No hay tarjetas disponibles.</p>
      )}
    </div>
  );
};

export default CardList;
