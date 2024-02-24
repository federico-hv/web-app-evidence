import { DialogContextProvider } from '../../../../shared';
import { useDisclosure } from '@holdr-ui/react';
import { CreatePostCard } from '../cards';
import { useCurrentUser } from '../../../auth';
import CreateFeedDialog from '../dialogs/create-feed';

function CreatePost() {
  const currentUser = useCurrentUser();

  const { isOpen, onOpen: open, onClose } = useDisclosure();

  const onOpen = () => {
    open();
  };

  if (!currentUser || currentUser.role !== 'artist') {
    return <></>;
  }

  return (
    <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
      <CreatePostCard />
      <CreateFeedDialog />
    </DialogContextProvider>
  );
}
CreatePost.displayName = 'CreatePost';

export default CreatePost;
