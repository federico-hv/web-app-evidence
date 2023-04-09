import { Routes, Route } from 'react-router';
import {
  HomePage,
  NotFoundPage,
  LoginPage,
  FanRegisterPage,
  ArtistRegisterPage,
} from 'pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/fan-register' element={<FanRegisterPage />} />
      <Route path='/artist-register' element={<ArtistRegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
