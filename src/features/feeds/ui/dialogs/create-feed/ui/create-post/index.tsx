import { useCreateFeedContext } from '../../shared';
import { VStack } from '@holdr-ui/react';
import { CreatePostEditor } from '../index';
import AddMedia from '../../../../groups/add-media';
import AddPoll from '../../../../groups/add-poll';
import ChooseFeedType from '../choose-feed-type';
import {
  TextGroup,
  TextGroupSubheading,
} from '../../../../../../../shared';

function CreatePost() {
  const { updatePostState, type } = useCreateFeedContext();
  return (
    <VStack t='1rem' l={0} r={0} overflowY='auto' pb={4} gap={4}>
      <CreatePostEditor update={updatePostState} />
      <ChooseFeedType />
      {type === 'with-image' && (
        <AddMedia
          as={
            <TextGroup items='center' w='fit-content' gap={0}>
              <TextGroupSubheading size={2} color='white500'>
                Add photos/videos
              </TextGroupSubheading>
              <TextGroupSubheading color='base300' size={2}>
                or drag and drop
              </TextGroupSubheading>
            </TextGroup>
          }
          update={updatePostState}
        />
      )}
      {type === 'with-poll' && <AddPoll update={updatePostState} />}
    </VStack>
  );
}
CreatePost.displayName = 'CreatePost';

export default CreatePost;
