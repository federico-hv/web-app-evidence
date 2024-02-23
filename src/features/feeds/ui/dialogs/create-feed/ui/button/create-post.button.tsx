import { useCreatePost } from '../../../../../shared';
import { Button } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../../../../../shared';
import { useCreateFeedContext } from '../../context';

function CreatePostButton() {
  const { createPost, loading } = useCreatePost();
  const { postState, close } = useCreateFeedContext();
  return (
    <Button
      isLoading={loading}
      loadingText={loading ? '' : 'Posting'}
      onClick={async () => {
        const result = await createPost(postState);
        if (result) {
          close();
        }
      }}
      className={makeButtonLarger('2.5rem', '15px')}
      colorTheme='purple500'
      fullWidth
    >
      Post
    </Button>
  );
}
CreatePostButton.displayName = 'CreatePostButton';

export default CreatePostButton;
