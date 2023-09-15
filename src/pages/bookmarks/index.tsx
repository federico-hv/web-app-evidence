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
import BookmarkGroupsList from './ui/bookmark-groups.list';
import { ErrorBoundary } from 'react-error-boundary';

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
          as='aside'
          h='100%'
          w={{
            '@bp4': 300,
            '@bp5': 350,
          }}
          borderRight={2}
          borderColor='base100'
          css={{
            flexShrink: 0,
          }}
        >
          <PageLayout>
            <PageLayoutHeader>
              <HStack w='100%' justify='space-between' items='center'>
                Bookmarks
                <IconButton
                  variant='ghost'
                  icon='add'
                  ariaLabel='Create bookmark group'
                />
              </HStack>
            </PageLayoutHeader>
            <PageLayoutContent>
              <Box px={4} py={4} borderBottom={2} borderColor='base100'>
                <InputGroup radius='full'>
                  <InputGroup.LeftElement>
                    <Icon name='search-outline' />
                  </InputGroup.LeftElement>
                  <Input placeholder='Search bookamarks' />
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
