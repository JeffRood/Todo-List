
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

	}, [actions]);

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
