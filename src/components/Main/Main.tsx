import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './Main.scss';
import Garage from '../Garage/Garage';
import NotFoundPage from '../NotFound/NotFound';
import Winners from '../Winners/Winners';


function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default Main;