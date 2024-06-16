import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  VStack,
} from '@holdr-ui/react';
import {
  Loader,
  LoadWithoutPreviousLocation,
  makeButtonLarger,
  makePath,
  Paths,
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FlatList } from '../../../../tmp/flat-list';
import {
  useBasicGetBookmarkGroups,
  useCreateBookmark,
} from '../../../../features';
import { Fragment, useEffect, useState } from 'react';

function SaveBookmarkGroupPage() {
  const [ids, setIds] = useState<string[]>([]);

  const { state } = useLocation();
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

  const addToIds = (id: string) => setIds((prev) => [...prev, id]);

  const removeFromIds = (id: string) =>
    setIds((prev) => prev.filter((_id) => _id !== id));

  if (!state.feedId) {
    console.error('Save bookmarks missing feed ID.');
    return <Navigate to={previousLocation} />;
  }

  return (
    <Fragment>
      <LoadWithoutPreviousLocation default={previousLocation} />
      <VStack w={450}>
        <HStack
          items='center'
          justify='space-between'
          borderBottom={1}
          borderColor='rgba(152, 152, 255, 0.10)'
          p={4}
        >
          <Heading color='white500' weight={500} size={6} as='h2'>
            Bookmark Groups
          </Heading>
          <IconButton
            colorTheme='purple100'
            icon='add'
            size='sm'
            className={makeButtonLarger('2rem')}
            ariaLabel='add bookmark'
            onClick={() =>
              navigate(makePath([Paths.bookmarks, 'create']), {
                state: {
                  previousLocation: previousLocation,
                  overlayPreviousLocation: '/bookmarks/save',
                },
              })
            }
          />
        </HStack>
        <VStack px={4} pb={4} gap={5} h='100%'>
          <List items={ids} add={addToIds} remove={removeFromIds} />
          <HStack gap={2} justify='flex-end' w='100%'>
            <Button
              type='submit'
              onClick={() => navigate(previousLocation)}
              variant='ghost'
              colorTheme='purple300'
              radius={1}
              css={{
                px: '$7',
              }}
            >
              Close
            </Button>
            <Button
              type='submit'
              disabled={ids.length === 0}
              // isLoading={loading}
              loadingText='Edit Group'
              onClick={async () => {
                // await saveToManyBookmarkGroups(state.feedId, ids).then(() =>
                //   navigate(previousLocation),
                // );
              }}
              colorTheme='purple500'
              radius={1}
              css={{
                px: '$7',
              }}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Fragment>
  );
}
SaveBookmarkGroupPage.displayName = 'SaveBookmarkGroupPage';

function List({
  items,
  add,
  remove,
}: {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
}) {
  const { state } = useLocation();

  const { data, loading, error } = useBasicGetBookmarkGroups({
    feedId: state.feedId,
  });

  useEffect(() => {
    if (data) {
      data.bookmarkGroups.edges.forEach((item) => {
        if (item.node.saved) {
          add(item.node.id);
        }
      });
    }
  }, [data]);

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <VStack>
          <FlatList
            py={3}
            gap={4}
            maxHeight={400}
            overflowY='auto'
            direction='vertical'
            className='thin-scrollbar'
            data={data.bookmarkGroups.edges}
            css={{
              paddingInlineEnd: '$3',
            }}
            renderItem={(item) => {
              const exists =
                items.findIndex((id) => id === item.node.id) >= 0;

              return (
                <HStack
                  px={3}
                  py={1}
                  radius={1}
                  border={exists ? 1 : 0}
                  items='center'
                  borderColor='rgba(152, 152, 255, 0.10)'
                  bgColor={
                    exists ? 'rgba(152, 152, 255, 0.15)' : undefined
                  }
                  onClick={
                    exists
                      ? () => remove(item.node.id)
                      : () => add(item.node.id)
                  }
                  css={{ userSelect: 'none' }}
                >
                  <TextGroup>
                    <TextGroupSubheading color='white500' weight={500}>
                      {item.node.name}
                    </TextGroupSubheading>
                    <TextGroupSubheading
                      color='white700'
                      weight={300}
                      size={2}
                    >
                      {item.node.total} items
                    </TextGroupSubheading>
                  </TextGroup>
                  {exists && (
                    <Box fontSize={6}>
                      <Icon color='white500' name='circle-check-outline' />
                    </Box>
                  )}
                </HStack>
              );
            }}
            keyExtractor={(item) => item.node.id}
          />
        </VStack>
      )}
    </Loader>
  );
}

export default SaveBookmarkGroupPage;
