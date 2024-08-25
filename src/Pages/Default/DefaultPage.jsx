import React from 'react';

const DefaultPage = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenido a Turismo</h1>
        <p className="text-xl text-red-600 mb-6">{message}</p>
        <p className="text-lg text-gray-600">Por favor, inicia sesión para ver las rutas disponibles.</p>
      </div>
    </div>
  );
};

export default DefaultPage;