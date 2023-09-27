import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoListApp from './TodoListApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoListApp />
  </React.StrictMode>
)
