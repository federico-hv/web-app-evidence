import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { SetupReleasesFlow } from '../../pages';

const SetupFlowRoutes = () => (
  <Routes>
    <Route path={Paths.releases} element={<SetupReleasesFlow />} />
  </Routes>
);
SetupFlowRoutes.displayName = 'SetupFlowRoutes';

export default SetupFlowRoutes;
