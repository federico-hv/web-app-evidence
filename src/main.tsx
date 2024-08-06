import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './styles/index.css';
import LogRocket from 'logrocket';

LogRocket.init('weponz/holdr-staging');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
