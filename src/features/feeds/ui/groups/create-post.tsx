import { DialogTabContextProvider } from '../../../../shared';
import { useDisclosure } from '@holdr-ui/react';
import { useState } from 'react';
import { CreatePostDialog, AddArticleDialog } from '../dialogs';
import { CreatePostCard } from '../cards';

function CreatePost() {
  // 🔧 Hack: using the option to select which additional component to add when creating a post
  const [option, setOption] = useState('');
  const { isOpen, onOpen: open, onClose } = useDisclosure();

  const onOpen = (option: string) => {
    setOption(option);
    open();
  };

  return (
    <DialogTabContextProvider value={{ isOpen, onOpen, option, onClose }}>
      <CreatePostCard />
      {isOpen && option !== 'article' && <CreatePostDialog />}
      {isOpen && option === 'article' && <AddArticleDialog />}
    </DialogTabContextProvider>
  );
}
CreatePost.displayName = 'CreatePost';

export default CreatePost;
