import { UnconnectedDialog } from '../../../features';
import { useDisclosure } from '@holdr-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

function SetupReleasesFlow() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousLocation = location.state?.previousLocation;

  const disclosure = useDisclosure(true);

  const onClose = () => {
    disclosure.onClose();
    navigate(previousLocation || -1);
  };

  return (
    <UnconnectedDialog
      {...disclosure}
      onClose={onClose}
      ariaDescribedBy='title'
    />
  );
}
SetupReleasesFlow.displayName = 'Setup Releases Flow';

export default SetupReleasesFlow;
