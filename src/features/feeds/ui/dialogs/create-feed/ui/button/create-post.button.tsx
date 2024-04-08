import {
  PollSchema,
  PostSchema,
  useCreatePost,
} from '../../../../../shared';
import { Button } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../../../../../shared';
import { useCreateFeedContext } from '../../shared';

function CreatePostButton() {
  const { createPost, loading } = useCreatePost();
  const { postState, close } = useCreateFeedContext();

  const checkIsDisabled = () => {
    try {
      PostSchema.validateSync(postState);
      if (postState.responses) {
        PollSchema.validateSync(postState);
      }
      return false;
    } catch (e) {
      return true;
    }
  };

  const postButtonSize = makeButtonLarger('3.0rem', '16px');

  return (
    <Button
      isLoading={loading}
      disabled={checkIsDisabled()}
      loadingText={loading ? '' : 'Posting'}
      onClick={async () => {
        const result = await createPost(postState);
        if (result) {
          close();
        }
      }}
      className={postButtonSize}
      colorTheme='purple500'
      fullWidth
    >
      Post
    </Button>
  );
}
CreatePostButton.displayName = 'CreatePostButton';

export default CreatePostButton;
