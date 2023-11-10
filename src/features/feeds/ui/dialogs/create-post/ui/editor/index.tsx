import { Editor, UserModel, useDialogTabContext } from 'shared';
import { MentionNode } from '../../../../../../../shared/components/editor/shared';
import { HashtagNode } from '@lexical/hashtag';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import {
  MaxLengthPlugin,
  MentionsPlugin,
} from '../../../../../../../shared/components/editor/ui';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { GenericOption } from '../../../../../../../shared/components/editor/types';
import { css } from 'configs';
import { useSearch } from '../../../../../../../features/search';
import { CreatePostInput } from 'features/feeds/shared';
import { Box, Text } from '@holdr-ui/react';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

const nodeStyle = css({
  fontWeight: '$600',
  color: '$secondary400',
})();

export default function CreatePostEditor({
  state,
  update,
}: {
  state: CreatePostInput;
  update: (
    next: Partial<CreatePostInput>,
    cb?: (current: CreatePostInput) => void,
  ) => void;
}) {
  const { option } = useDialogTabContext();
  // TODO
  const [search, { results }] = useSearch<UserModel>();
  return (
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
        <MentionsPlugin
          keyExtractor={(data: GenericOption) => data.name}
          // TODO: add popover
          renderItem={(data: GenericOption) => <Text>{data.name}</Text>}
          // TODO: replace with real api fetch
          dataFetcher={(state: string | null) => [
            { name: 'Bob' },
            { name: 'Joe' },
            { name: 'John' },
          ]}
          key='MentionsPlugin'
        />,
        <HashtagPlugin key='HashtagPlugin' />,
        <AutoFocusPlugin key='AutoFocusPlugin' />,
        <MaxLengthPlugin key='MaxLengthPlugin' maxLength={150} />,
        <HistoryPlugin key='HistoryPlugin' />,
      ]}
      onChange={(state) =>
        update({ description: state.message, ...state })
      }
      Placeholder={
        <Box position='absolute' t={0} px='$3'>
          <Text color='base400'>
            {option === 'poll'
              ? 'What do you want to find out from your fans?'
              : 'What do you want your fans to know?'}
          </Text>
        </Box>
      }
    />
  );
}
