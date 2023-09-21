import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
} from '@holdr-ui/react';
import {
  Head,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  Paths,
  ShelfLayout,
  ShelfLayoutShelf,
  ErrorFallback,
  Loader,
} from '../../shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import BookmarkGroupsList from './ui/bookmark-groups.list';
import CreateBookmarkGroup, {
  CreateBookmarkGroupTrigger,
} from '../../features/bookmarks/ui/create-bookmark-group';

function BookmarksPage() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      navigate(`/${Paths.bookmarks}/all`);
    }
  }, []);

  return (
    <Box>
      <Head title='Bookmarks' description='' />
      <ShelfLayout>
        <ShelfLayoutShelf
          position='relative'
          as='aside'
          h='100%'
          w={{
            '@bp4': 300,
            '@bp5': 350,
          }}
          borderColor='base100'
          css={{
            flexShrink: 0,
          }}
        >
          <PageLayout
            position='fixed'
            t={65}
            b={0}
            overflowY='auto'
            h='100%'
            w={{
              '@bp4': 300,
              '@bp5': 350,
            }}
          >
            <PageLayoutHeader
              position='sticky'
              t={0}
              css={{ backgroundColor: '#FFF', zIndex: 10 }}
            >
              <HStack w='100%' justify='space-between' items='center'>
                Bookmarks
                <CreateBookmarkGroup
                  onCreated={(id) => navigate(`/${Paths.bookmarks}/${id}`)}
                >
                  <CreateBookmarkGroupTrigger>
                    <IconButton
                      role='button'
                      variant='ghost'
                      icon='add'
                      ariaLabel='Create bookmark group'
                    />
                  </CreateBookmarkGroupTrigger>
                </CreateBookmarkGroup>
              </HStack>
            </PageLayoutHeader>
            <PageLayoutContent>
              <Box
                position='sticky'
                t={58}
                px={4}
                py={4}
                borderBottom={2}
                borderColor='base100'
                css={{ backgroundColor: '#FFF', zIndex: 10 }}
              >
                <InputGroup radius='full'>
                  <InputGroup.LeftElement>
                    <Icon name='search-outline' />
                  </InputGroup.LeftElement>
                  <Input placeholder='Search bookmarks' />
                </InputGroup>
              </Box>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader loading={true} />}>
                  <BookmarkGroupsList />
                </Suspense>
              </ErrorBoundary>
            </PageLayoutContent>
          </PageLayout>
        </ShelfLayoutShelf>
        <ShelfLayoutShelf w='100%' role='contentinfo'>
          <Outlet />
        </ShelfLayoutShelf>
      </ShelfLayout>
    </Box>
  );
}
BookmarksPage.displayName = 'Bookmarks Page';

export default BookmarksPage;
