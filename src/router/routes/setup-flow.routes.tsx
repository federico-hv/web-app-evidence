import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { SetupReleasesFlow } from '../../pages';
import {
  ArtistSelectionStep,
  ConnectionStep,
  GetStartedStep,
} from '../../pages/setup-flow/releases/ui';
import { Navigate } from 'react-router-dom';

const SetupFlowRoutes = () => (
  <Routes>
    <Route path={Paths.releases} element={<SetupReleasesFlow />}>
      <Route path='' element={<Navigate to='get-started' />} />
      <Route path='get-started' element={<GetStartedStep />} />
      <Route path='connection' element={<ConnectionStep />} />
      <Route path='artist-selection' element={<ArtistSelectionStep />} />
    </Route>
  </Routes>
);
SetupFlowRoutes.displayName = 'SetupFlowRoutes';

export default SetupFlowRoutes;
