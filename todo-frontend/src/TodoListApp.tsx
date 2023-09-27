
import { useState, useEffect } from 'react';
import './TodoList.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Domain/routes/route';
import { AuthProvider, useAuth } from './Domain/context/authContext';
import { AppProvider } from './Domain/context/appContext';
import AuthRoutes from './Domain/routes/auth';


function TodoListApp() {
	const { state, actions } = useAuth()

 useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.preventDefault(); // Evitar recarga de página en clics de botón
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Resto de tu aplicación


	
	return (
		<>		
		<AuthProvider> 	
			<AppProvider>
				<Router>
				{state.userToken == null ? (
				<AuthRoutes />
				) : (
				<AppRoutes />
				)}
				</Router>
			</AppProvider>
		</AuthProvider>
		</>
	)
}

export default TodoListApp
