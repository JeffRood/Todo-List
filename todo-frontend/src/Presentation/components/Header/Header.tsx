
import React, { useState } from 'react';
import './Header.css';

const Header: React.FC = ({ onCreate, name, onLogOut }: any) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  function getInitial(name: string) {
    const work = name.split(' ');
    const initials = work.map(work => work.charAt(0).toUpperCase());
    return initials.join('');
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <section className='header_container'>
      <h1 className='header_title'>ToDo List</h1>

      {authenticated && (
        <div className="avatar-container">
          <div
            className="avatar-circle"
            style={{ backgroundColor: 'rgb(127, 31, 129)' }}
            onClick={toggleOptions}
          >
            <span className="initials">{getInitial(name)}</span>
          </div>
          {optionsVisible && (
            <div className="options">
              <button onClick={onLogOut}>Cerrar Sesión</button>
              {/* Agrega más opciones aquí */}
            </div>
          )}
        </div>
      )}

      <button onClick={onCreate} className='create_container'>
        <i className='bx bx-task'></i>
      </button>
    </section>
  );
};

export default Header;
