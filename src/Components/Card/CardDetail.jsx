import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive";
import './cardDetail.css';

const CardDetail = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userHasReservation, setUserHasReservation] = useState(false);
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            <div className="card-detail">
                {error && <p className="text-red-600">{error}</p>}
                {card ? (
                    <div className="card-content-detail">
                        <img 
                            className="card-image-detail" 
                            src={card.image_url} 
                            alt={card.name} 
                        />
                        <div className="card-text-detail">
                            <h2 className="card-title-detail">{card.name}</h2>
                            <p><span>Estado: </span>{card.status}</p>
                            <p><span>Máx. Reservas: </span>{card.max_reservations}</p>
                            {!userHasReservation ? (
                                <button 
                                    className="reserve-button"
                                    onClick={handleReserve}
                                >
                                    Reservar
                                </button>
                            ) : (
                                <button 
                                    className="cancel-button"
                                    onClick={handleCancelReservation}
                                >
                                    Cancelar Reserva
                                </button>
                            )}
                        </div>
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
