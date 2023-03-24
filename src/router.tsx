import { Routes, Route } from 'react-router';
import { HomePage, NotFoundPage, LoginPage } from 'pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
