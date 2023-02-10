import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, NotFoundPage } from 'pages';
import { globalStyles } from 'configs';

export function BaseApp() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

// Create a HOC for this - configures the app
export function App() {
  // initial styles
  globalStyles();
  return (
    <BrowserRouter>
      <BaseApp />
    </BrowserRouter>
  );
}
