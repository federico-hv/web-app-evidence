import { Box } from '@holdr-ui/react';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  EmptyMessage,
  useDialogTabContext,
} from 'shared';

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
        <ViewUsersList />
      </CommonDialogContent>
    </CommonDialog>
  );
}

// TODO: integrate views query
function ViewUsersList() {
  return (
    <Box pt={4}>
      <EmptyMessage
        title='No views yet.'
        subtitle='Nobody has viewed your post yet.'
      />
    </Box>
  );
}

export default FeedViewsUsersDialog;
