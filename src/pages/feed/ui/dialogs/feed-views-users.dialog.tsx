import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  useDialogTabContext,
} from 'shared';
import { FeedUsersList } from '../lists';

function FeedViewsUsersDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  if (option != 'views') return null;

  return (
    <CommonDialog
      minHeight='85vh'
      isOpen={isOpen}
      onOpen={() => onOpen('views')}
      onClose={onClose}
    >
      <CommonDialogHeader label='Feed Views' />
      <CommonDialogContent>
        <FeedUsersList />
      </CommonDialogContent>
    </CommonDialog>
  );
}

export default FeedViewsUsersDialog;
