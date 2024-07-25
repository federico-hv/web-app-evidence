import {
  Box,
  Button,
  Center,
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
  useRemoveBookmark,
} from '../../../../features';
import { Fragment } from 'react';

function SaveBookmarkGroupPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

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
                  feedId: state.feedId,
                  previousLocation: previousLocation,
                  overlayPreviousLocation: '/bookmarks/save',
                },
              })
            }
          />
        </HStack>
        <VStack px={4} pb={4} gap={5} h='100%'>
          <CreatedBookmarkGroupsList />
          <HStack gap={2} justify='flex-end' w='100%'>
            <Button
              type='submit'
              onClick={() => navigate(previousLocation)}
              colorTheme='purple500'
              radius={1}
              css={{
                px: '$7',
              }}
            >
              Close
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Fragment>
  );
}
SaveBookmarkGroupPage.displayName = 'SaveBookmarkGroupPage';

function CreatedBookmarkGroupsList() {
  const { state } = useLocation();

  const { createBookmark, loading: loadingCreate } = useCreateBookmark();
  const { removeBookmark, loading: loadingRemove } = useRemoveBookmark();

  const { data, loading, error } = useBasicGetBookmarkGroups({
    feedId: state.feedId,
  });

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
              return (
                <HStack
                  px={3}
                  py={1}
                  radius={1}
                  border={item.node.saved ? 1 : 0}
                  items='center'
                  borderColor='rgba(152, 152, 255, 0.10)'
                  bgColor={
                    item.node.saved
                      ? 'rgba(152, 152, 255, 0.15)'
                      : undefined
                  }
                  onClick={
                    item.node.saved && !(loadingCreate || loadingRemove)
                      ? () => removeBookmark(state.feedId, item.node.id)
                      : () => createBookmark(state.feedId, item.node.id)
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
                  {item.node.saved && (
                    <Center fontSize={6}>
                      <Icon color='white500' name='circle-check-outline' />
                    </Center>
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
