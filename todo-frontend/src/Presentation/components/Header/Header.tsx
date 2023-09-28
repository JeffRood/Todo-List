import React, { useState } from 'react';
import './Header.css';

const Header: React.FC = ({ onCreate }: any) => {
  
  const [authenticated, setAuthenticated] = useState(true);

  
  const handleLogout = () => {
    setAuthenticated(false);
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const randomColor = getRandomColor();


  return (
    <section className='header_container'>
      <h1 className='header_title'>ToDo List</h1>

      {/* Mostrar avatar y botón de cierre de sesión si el usuario está autenticado */}
      {authenticated && (
            <div className="avatar-circle" style={{ backgroundColor: randomColor }}>
            <span className="initials">TU</span>
            </div>
      )}

      <button onClick={onCreate} className='create_container'>
        <i className='bx bx-task'></i>
      </button>
    </section>
  );
};

export default Header;
