import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useDisclosure,
} from '@holdr-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function SetupAccountDialog() {
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Dialog
      {...disclosure}
      onClose={() => navigate(location.state?.previousLocation || '/')}
    >
      <DialogPortal>
        <DialogOverlay zIndex={20} />
        <DialogContent
          zIndex={20}
          className='setup-account'
          minWidth={485}
          h={615}
          maxHeight='90vh'
          bgColor='#30304B'
          overflow='auto'
        >
          <DialogBody h='100%' zIndex={50} py={56} px={48}>
            <Outlet />
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default SetupAccountDialog;
