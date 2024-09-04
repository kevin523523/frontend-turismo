import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive";
import './cardDetail.css';

const CardDetailGuides = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userHasReservation, setUserHasReservation] = useState(false);
    const { guideId } = useParams(); // Cambiado a guideId para reflejar que se trata de un guía
    const [guide, setGuide] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchGuideDetail = async () => {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) return;

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

            if (data.guides && data.guides[guideId]) {
                setGuide(data.guides[guideId]);
                setUserHasReservation(data.guides[guideId].reserved_users.includes(userId));
            } 

        } catch (error) {
            setError('Error al obtener los detalles del guía: ' + error.message);
        }
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('user_id');
        setIsLoggedIn(!!userId);
        fetchGuideDetail();
    }, [guideId, navigate]);

    const handleReserve = async () => {
        try {
            const userId = sessionStorage.getItem('user_id');
            const response = await fetch(`http://127.0.0.1:5500/index.php?action=reserve_guide&guide_id=${guideId}&user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Reserva realizada con éxito.');
                setUserHasReservation(true);
                await fetchGuideDetail(); // Actualiza los detalles del guía
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
            const response = await fetch(`http://127.0.0.1:5500/index.php?action=cancel_guide_reservation&guide_id=${guideId}&user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Reserva cancelada con éxito.');
                setUserHasReservation(false);
                await fetchGuideDetail(); // Actualiza los detalles del guía
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
                {guide ? (
                    <div className="card-content-detail">
                        <img 
                            className="card-image-detail" 
                            src={guide.image_url} 
                            alt={guide.name} 
                        />
                        <div className="card-text-detail">
                            <h2 className="card-title-detail">{guide.name}</h2>
                            <p><span>Estado: </span>{guide.availability}</p>
                            <p><span>Máx. Reservas: </span>{guide.max_reservations}</p>
                            <p><span>Comentario: </span>{guide.comment}</p>
                            <p><span>Calificación: </span>{guide.rating}</p>
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

export default CardDetailGuides;
