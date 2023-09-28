
import {  useEffect } from 'react';
import './TodoList.css'
import { AuthProvider } from './Domain/context/authContext';
import { AppProvider } from './Domain/context/appContext';
import TodoListApp from './TodoListApp';


function App() {

 useEffect(() => {
    const handleClick = (event:any) => {
      if (event.target.tagName === 'BUTTON') {
        event.preventDefault(); 
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
    document.removeEventListener('click', handleClick);
    };
  }, []);


	
	return (
		<>		
		<AuthProvider> 	
			<AppProvider>
                <TodoListApp/>
			</AppProvider>
		</AuthProvider>
		</>
	)
}

export default App
