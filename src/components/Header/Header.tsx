import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">

      <nav className="nav">
        <Link to="/garage" className="nav-item">
          Garage
        </Link>
        <Link to="/winners" className="nav-item">
          Winners
        </Link>
      </nav>
    </header>
  );
}

export default Header;