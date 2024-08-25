import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive";

const CardDetail = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userHasReservation, setUserHasReservation] = useState(false);
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para obtener los detalles de la tarjeta
    const fetchCardDetail = async () => {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) return;

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

            if (data.routes && data.routes[cardId]) {
                setCard(data.routes[cardId]);
                setUserHasReservation(data.routes[cardId].reserved_users.includes(userId));
            } else {
                setError('No se encontraron detalles para esta tarjeta.');
            }

        } catch (error) {
            setError('Error al obtener los detalles de la tarjeta: ' + error.message);
        }
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('user_id');
        setIsLoggedIn(!!userId);
        fetchCardDetail();
    }, [cardId, navigate]);

    const handleReserve = async () => {
        try {
            const userId = sessionStorage.getItem('user_id');
            const response = await fetch(`http://127.0.0.1:5500/index.php?action=reserve&route_id=${cardId}&user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Reserva realizada con éxito.');
                setUserHasReservation(true);
                await fetchCardDetail(); // Actualiza los detalles de la tarjeta
            } else {
                alert('Error al realizar la reserva: ' + data.message);
            }

        } catch (error) {
            alert('Error al realizar la reserva: ' + error.message);
        }
    };

    const handleCancelReservation = async () => {
        try {
            const userId = sessionStorage.getItem('user_id');
            const response = await fetch(`http://127.0.0.1:5500/index.php?action=cancel&route_id=${cardId}&user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Reserva cancelada con éxito.');
                setUserHasReservation(false);
                await fetchCardDetail(); // Actualiza los detalles de la tarjeta
            } else {
                alert('Error al cancelar la reserva: ' + data.message);
            }

        } catch (error) {
            alert('Error al cancelar la reserva: ' + error.message);
        }
    };

    return (
        <div className="app-container">
            {isLoggedIn ? <NavBarActive /> : <NavBar />}
            <div className="card-detail" style={{ 
                maxWidth: '450px', 
                marginTop: '80px',
                marginLeft: '35%', 
                padding: '16px', 
                backgroundColor: 'white', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                }}>
                {error && <p className="text-red-600">{error}</p>}
                {card ? (
                    <div>
                        <img 
                            src={card.image_url} 
                            alt={card.name} 
                            style={{ width: '100%', height: '400px', borderRadius: '8px' }} 
                        />
                        <h2 style={{ margin: '16px 0' }}>{card.name}</h2>
                        <p>Estado: {card.status}</p>
                        <p>Máx. Reservas: {card.max_reservations}</p>
                        {!userHasReservation ? (
                            <button 
                                onClick={handleReserve} 
                                style={{ 
                                padding: '8px 16px', 
                                backgroundColor: '#007bff', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer' 
                                }}
                            >
                                Reservar
                            </button>
                        ) : (
                            <button 
                                onClick={handleCancelReservation} 
                                style={{ 
                                padding: '8px 16px', 
                                backgroundColor: '#dc3545', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer' 
                                }}
                            >
                                Cancelar Reserva
                            </button>
                        )}
                    </div>
                ) : (
                    <p>Cargando detalles...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CardDetail;
