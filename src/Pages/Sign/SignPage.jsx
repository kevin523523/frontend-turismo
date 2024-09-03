import React, { useState } from 'react';
import { Footer } from "../../Components/Footer/Footer";
import { NavBar } from "../../Components/NavBar/NavBar";
import './Sign.css';
import { useNavigate } from 'react-router-dom';

export const SignPage = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !password) {
      setError('Usuario o contraseña faltantes');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5500/signIn.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Sign In Result:', result);
  
      if (result.status === 'success') {
        sessionStorage.setItem('user_id', result.user_id);
        setSuccess('Inicio de sesión exitoso');
        // Redirigir a la página principal
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };
  

  return (
    <div className="app-container">
      <NavBar />
      <main className="content">
        <section className="sign-section">
          <div className="sign-content">
            <section className="bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-10 h-10 mr-4" src="https://www.lasdunassurfresort.com/wp-content/uploads/2022/05/vida-ecologica-960x636-1.jpg" alt="logo" style={{width:"250px",height:"150px"}} />
                  EcoTurismo
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Inicia sesión con tu cuenta
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                        <input 
                          type="text" 
                          name="user" 
                          id="user" 
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          placeholder="Coloca tu usuario" 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input 
                          type="password" 
                          name="password" 
                          id="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          required 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input 
                              id="remember" 
                              aria-describedby="remember" 
                              type="checkbox" 
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recuérdame</label>
                          </div>
                        </div>
                        <a href="#" className="font-light text-blue-600 hover:underline dark:text-blue-500">¿Olvidaste la contraseña?</a>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Iniciar sesión
                      </button>
                      {error && <p className="text-red-600">{error}</p>}
                      {success && <p className="text-green-600">{success}</p>}
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
