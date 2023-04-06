import { Routes, Route } from 'react-router';
import { HomePage, NotFoundPage, LoginPage, RegisterPage } from 'pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
