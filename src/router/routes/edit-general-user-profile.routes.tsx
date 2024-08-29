import { Route, Routes } from 'react-router';
import { NavigateWithPreviousLocation } from '../../shared';
import {
  EditUserAddFavoritesPage,
  EditUserProfileDialog,
  EditUserProfilePage,
} from '../../pages';

const EditGeneralUserProfileRoutes = () => (
  <Routes>
    <Route element={<EditUserProfileDialog />}>
      <Route
        path=''
        element={
          <NavigateWithPreviousLocation to='profile' fallback='/' />
        }
      />
      <Route path='profile' element={<EditUserProfilePage />} />
      <Route path='favorites' element={<EditUserAddFavoritesPage />} />
    </Route>
  </Routes>
);

export default EditGeneralUserProfileRoutes;
