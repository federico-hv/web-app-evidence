import { Routes, Route } from 'react-router';
import { HomePage, NotFoundPage } from 'pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
