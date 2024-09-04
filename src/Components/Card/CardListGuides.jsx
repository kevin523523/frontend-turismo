import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cardList.css';

const CardListGuides = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchGuides = async () => {
    const userId = sessionStorage.getItem('user_id');
    if (!userId) {
      setError('Usuario no autenticado');
      setTimeout(() => navigate('/api/sign'), 3000);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5500/index.php?action=show_available_guides&user_id=${userId}`, {
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

      if (data.guides) {
        setGuides(Object.values(data.guides));
      } else {
        setError('No hay guías disponibles.');
      }

    } catch (error) {
      setError('Error al obtener los guías: ' + error.message);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [navigate]);

  const handleViewMore = (guideIndex) => {
    navigate(`/guide/${guideIndex}`);
  };

  return (
    <div className="card-list">
      {error && <p className="text-red-600">{error}</p>}
      {guides.length > 0 ? (
        guides.map((guide, index) => (
          <div key={index} className="card">
            <img src={guide.image_url} alt={guide.name} className="card-image" />
            <h2 className="card-title">{guide.name}</h2>
            <p className="card-status"><span>Estado: </span>{guide.status}</p>
            <p className="card-max-reservations"><span>Máx. Reservas: </span>{guide.max_reservations}</p>
            <button
              onClick={() => handleViewMore(index)}
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
        !error && <p className="text-gray-500">No hay guías disponibles.</p>
      )}
    </div>
  );
};

export default CardListGuides;
