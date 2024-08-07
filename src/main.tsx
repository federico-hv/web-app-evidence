import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './styles/index.css';
import { initializeLogRocket } from './lib';

initializeLogRocket();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
