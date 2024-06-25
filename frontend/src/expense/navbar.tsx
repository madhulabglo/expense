import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "../style/nav.css"

const Nav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate()

  const loginData = JSON.parse(localStorage.getItem('data') as string);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5501/5501384.png"
              alt="expense"
              style={{ width: '50px', height: '50px' }}
            />
          </span>
          {!isDrawerOpen && <p className="title">Expense Tracker</p>}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
        <button
          onClick={handleMenu}
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          aria-haspopup="true"
          aria-expanded={isMenuOpen} // Bind state to aria-expanded
        >
          <i className="bi bi-person-circle"></i>&nbsp;&nbsp;
          {loginData?.username}
        </button>
        <div className={`dropdown-menu ${isMenuOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>&nbsp;&nbsp;
            Log Out
          </a>
        </div>
      </nav>
      <div className={`drawer ${isDrawerOpen ? 'drawer-icon-open' : 'drawer-open'}`}>
        <ul>
          <li>
            <i className={`bi bi-house ${location.pathname === '/home' ? 'active-link' : ''}`}></i>
            {!isDrawerOpen && (
              <a href="/home" className={location.pathname === '/home' ? 'active-link' : ''}>
                Home
              </a>
            )}
          </li>
          <li>
            <i className={`bi bi-file-earmark ${location.pathname === '/expense' ? 'active-link' : ''}`}></i>
            {!isDrawerOpen && (
              <a href="/expense" className={location.pathname === '/expense' ? 'active-link' : ''}>
                Expense
              </a>
            )}
          </li>
          <li>
            <i className={`bi bi-people-fill ${location.pathname === '/roommates' ? 'active-link' : ''}`}></i>
            {!isDrawerOpen && (
              <a href="/roommates" className={location.pathname === '/roommates' ? 'active-link' : ''}>
                Room Mates
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
