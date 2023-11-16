import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { SetupReleasesFlow } from '../../pages';
import {
  ArtistSelectionStep,
  ConnectionStep,
  GetStartedStep,
} from '../../pages/setup-flow/releases/ui';
import { Box } from '@holdr-ui/react';

const SetupFlowRoutes = () => (
  <Routes>
    <Route path={Paths.releases} element={<SetupReleasesFlow />}>
      <Route path='get-started' element={<GetStartedStep />} />
      <Route path='connection' element={<ConnectionStep />} />
      <Route path='dummy' element={<Box />} />
      <Route path='artist-selection' element={<ArtistSelectionStep />} />
    </Route>
  </Routes>
);
SetupFlowRoutes.displayName = 'SetupFlowRoutes';

export default SetupFlowRoutes;
