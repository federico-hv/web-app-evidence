import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from 'configs';
import Router from './router';

export function App() {
  globalStyles();
  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_URL}>
      <Router />
    </BrowserRouter>
  );
}
