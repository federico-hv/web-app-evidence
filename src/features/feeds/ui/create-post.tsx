import CreatePostCard from './create-post.card';
import {
  DialogTabContextProvider,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../../shared';
import { useDisclosure } from '@holdr-ui/react';
import { useState } from 'react';

import CreatePostDialog from './create-post.dialog';
import AddArticleDialog from './add-article.dialog';

function CreatePost() {
  const [option, setOption] = useState('');
  const { isOpen, onOpen: open, onClose } = useDisclosure();

  const onOpen = (option: string) => {
    setOption(option);
    open();
  };

  return (
    <DialogTabContextProvider value={{ isOpen, onOpen, option, onClose }}>
      <CreatePostCard />
      <SwitchConditional>
        <SwitchConditionalCase on={isOpen && option !== 'article'}>
          <CreatePostDialog />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={isOpen && option === 'article'}>
          <AddArticleDialog />
        </SwitchConditionalCase>
      </SwitchConditional>
    </DialogTabContextProvider>
  );
}
CreatePost.displayName = 'CreatePost';

export default CreatePost;
