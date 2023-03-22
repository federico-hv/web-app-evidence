import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from 'configs';
import Router from './router';

// Create a HOC for this - configures the app
export function App() {
  // initial styles
  // change
  globalStyles();
  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_URL}>
      <Router />
    </BrowserRouter>
  );
}
