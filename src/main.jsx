import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { TurismoApp } from './TurismoApp.jsx';
import { AboutPage } from './Pages/About/AboutPage.jsx';
import { ClimaPage } from './Pages/Clima/ClimaPage.jsx';
import { LoginPage } from './Pages/Login/LoginPage.jsx';
import { SignPage } from  './Pages/Sign/SignPage.jsx';
import { ReservaPage } from  './Pages/Reserva/ReservaPage.jsx';
import CardDetail from './Components/Card/CardDetail.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TurismoApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/api/about',
    element: <AboutPage />,
  },
  {
    path: '/api/clima',
    element: <ClimaPage />,
  },
  {
    path: '/api/reserva',
    element: <ReservaPage />,
  },
  {
    path: '/api/login',
    element: <LoginPage />,
  },
  {
    path: '/api/sign',
    element: <SignPage />,
  },
  {
    path: '/card/:cardId',
    element: <CardDetail />, // Nueva ruta para la página de detalles de la tarjeta
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
