
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
        event.preventDefault(); 
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
    document.removeEventListener('click', handleClick);
    };
  }, []);


  useEffect(() => {

  }, [state.userToken])
  


	
	return (
		<>		

				<Router>
				{state.userToken == null ? (
				<AuthRoutes />
				) : (
				<AppRoutes />
				)}
				</Router>

		</>
	)
}

export default TodoListApp
