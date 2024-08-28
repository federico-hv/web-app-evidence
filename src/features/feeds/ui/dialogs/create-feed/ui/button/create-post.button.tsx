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
        console.log(postState);
        PollSchema.validateSync(postState);
      }
      return false;
    } catch (e) {
      return true;
    }
  };

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
      className={makeButtonLarger('3rem')}
      colorTheme='purple500'
      fullWidth
    >
      Post
    </Button>
  );
}
CreatePostButton.displayName = 'CreatePostButton';

export default CreatePostButton;
