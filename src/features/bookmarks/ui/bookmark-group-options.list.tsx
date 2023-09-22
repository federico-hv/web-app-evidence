import { useFeedContext } from '../../feeds';
import {
  FlexLabel,
  IBookmarkGroup,
  useCreateBookmark,
  useGetBookmarkGroups,
  useRemoveBookmark,
} from '../shared';
import { Box, Checkbox, HStack, useSwitch, VStack } from '@holdr-ui/react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';

function BookmarkGroupOption({ data }: { data: IBookmarkGroup }) {
  const { switchState, turnOn, turnOff } = useSwitch(!!data.saved);

  const { feedId } = useFeedContext();

  const { removeBookmark, loading: loadingRemove } = useRemoveBookmark();
  const { createBookmark, loading: loadingCreate } = useCreateBookmark();

  return (
    <HStack key={data.id} px={3} py={4}>
      <FlexLabel htmlFor={data.id}>
        <TextGroup
          cursor='pointer'
          id='bookmark-item'
          css={{ userSelect: 'none' }}
        >
          <TextGroupHeading size={3}>{data.name}</TextGroupHeading>
          <TextGroupSubheading size={2} color='base400'>
            {data.total} item{data.total > 0 ? 's' : ''}
          </TextGroupSubheading>
        </TextGroup>
      </FlexLabel>
      <Checkbox
        id={data.id}
        onChange={async () => {
          if (switchState) {
            turnOff(); // optimistic
            await removeBookmark(feedId, data.id);
          } else {
            turnOn(); // optimistic
            await createBookmark(feedId, data.id);
          }
        }}
        disabled={loadingCreate || loadingRemove}
        value={`${switchState}`}
        checked={switchState}
        labelledBy='bookmark-item'
      />
    </HStack>
  );
}

function BookmarkGroupOptionsList() {
  const { feedId } = useFeedContext();

  const { data } = useGetBookmarkGroups({
    feedId,
    fetchPolicy: 'network-only',
  });

  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      {data.bookmarkGroups.edges.map(({ node }) => (
        <BookmarkGroupOption key={node.id} data={node} />
      ))}
    </VStack>
  );
}
BookmarkGroupOptionsList.displayName = 'BookmarkGroupOptionsList';

export default BookmarkGroupOptionsList;
