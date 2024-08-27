import { PollSchema, PostSchema } from '../../../../../shared';
import { Button } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../../../../../shared';
import { useCreateFeedContext } from '../../shared';
import { useCreatePostMutation } from '../../../../../mutations';

function CreatePostButton() {
  const { createPost, loading } = useCreatePostMutation();
  const { postState, audience, close } = useCreateFeedContext();

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
        const result = await createPost({ ...postState, audience });
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
