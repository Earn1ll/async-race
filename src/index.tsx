import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import Main from '../src/components/Main/Main';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
