import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './styles/index.css';
import LogRocket from 'logrocket';

LogRocket.init(import.meta.env.VITE_LOG_ROCKET_ID);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
