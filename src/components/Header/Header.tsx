import React from "react";
import { NavLink } from "react-router-dom";
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/garage" className="nav-item">
          <div>Garage</div>
        </NavLink>
        <NavLink to="/winners" className="nav-item">
          <div>Winners</div>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
