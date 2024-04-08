import { MentionNode } from '../../../../../../../shared/components/editor/shared';
import { HashtagNode } from '@lexical/hashtag';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import {
  MaxLengthPlugin,
  MentionsPlugin,
} from '../../../../../../../shared/components/editor/ui';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CreatePostInput } from '../../../../../shared';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import CreatePostPlaceholder from '../placeholder';
import CreatePostMentionItem from '../mention-item';
import { nodeStyle as useNodeStyle } from '../styles';
import { omit } from 'lodash';
import { Editor, UserModel } from '../../../../../../../shared';
import { useSearch } from '../../../../../../search';
import { Box, hexToRGB } from '@holdr-ui/react';

export default function CreatePostEditor({
  update,
}: {
  update: (
    next: Partial<CreatePostInput>,
    cb?: (current: CreatePostInput) => void,
  ) => void;
}) {
  const nodeStyle = useNodeStyle();
  const [search, { results }] = useSearch<UserModel>();

  return (
    <Box
      radius={2}
      py={3}
      px={2}
      as='label'
      color='white500'
      minHeight={{ '@bp1': 75, '@bp3': 125 }}
      css={{
        backgroundColor: 'rgba(26, 26, 41, 0.75)',
        display: 'flex'
      }}
    >
      <Editor
        config={{
          onError: (e) => console.error(e),
          nodes: [MentionNode, HashtagNode],
          namespace: 'postEditor',
          theme: {
            hashtag: nodeStyle.className,
            mention: nodeStyle.className,
          },
        }}
        plugins={[
          <MentionsPlugin<UserModel>
            keyExtractor={(data) => data.username}
            renderItem={(data, selected: boolean) => (
              <CreatePostMentionItem data={data} selected={selected} />
            )}
            dataFetcher={async (mentionString) => {
              !mentionString
                ? await search('')
                : await search(mentionString);
            }}
            results={results}
            key='MentionsPlugin'
          />,
          <HashtagPlugin key='HashtagPlugin' />,
          <AutoFocusPlugin key='AutoFocusPlugin' />,
          <MaxLengthPlugin key='MaxLengthPlugin' maxLength={150} />,
          <HistoryPlugin key='HistoryPlugin' />,
        ]}
        onChange={(state) =>
          update({
            description: state.message,
            // length will be necessary with tokenized description
            ...omit(state, ['message', 'length']),
          })
        }
        Placeholder={<CreatePostPlaceholder />}
      />
    </Box>
  );
}
