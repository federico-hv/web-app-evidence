import {
  IPoll,
  IPostMedia,
  PostMedia,
  Polls,
  PostModel,
} from '../../../features';
import { Text, VStack } from '@holdr-ui/react';
import { SwitchConditional, SwitchConditionalCase } from '../../../shared';

function PostContent({ data }: { data: PostModel }) {
  return (
    <VStack>
      <Text size={{ '@bp1': 2, '@bp3': 3 }}>{data.description}</Text>
      <SwitchConditional>
        <SwitchConditionalCase on={data.media && data.media.length > 0}>
          <PostMedia items={data.media as IPostMedia[]} />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={data.polls && data.polls.length > 0}>
          <Polls
            items={data.polls as IPoll[]}
            id={data.id}
            endDate={data.endDate}
          />
        </SwitchConditionalCase>
      </SwitchConditional>
    </VStack>
  );
}
PostContent.displayName = 'PostContent';

export default PostContent;
