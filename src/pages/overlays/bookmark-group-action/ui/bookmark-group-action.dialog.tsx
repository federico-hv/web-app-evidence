import { usePreviousLocation } from '../../../../shared';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dialog, useDisclosure } from '@holdr-ui/react';

function BookmarkGroupActionDialog() {
  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();
  const disclosure = useDisclosure(true);

  return (
    <Dialog
      ariaDescribedBy=''
      {...disclosure}
      onClose={() => navigate(previousLocation)}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Body bgColor='rgb(48, 48, 75)' px={0} py={0}>
            <Outlet />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default BookmarkGroupActionDialog;
