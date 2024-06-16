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
        <Dialog.Overlay zIndex={10} />
        <Dialog.Content radius={4} zIndex={10} w='fit-content'>
          <Dialog.Body
            id='page-dialog-container'
            bgColor='#404066'
            px={0}
            py={0}
          >
            <Outlet />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default BookmarkGroupActionDialog;
