import { Box, IconButton, useWindowSize } from '@holdr-ui/react';
import { ErrorFallback, Loader, Paths, SearchBox } from '../../shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BookmarkGroupsList } from './ui';
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  ShelfLayout,
  ShelfLayoutShelf,
} from '../../layout';
import {
  CreateBookmarkGroup,
  CreateBookmarkGroupTrigger,
} from '../../features';

function BookmarksPage() {
  const { width } = useWindowSize();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // only navigate to `/all` when screen size is > tablet and there is no bookmark id/ no
    // specified path param

    if (!params.id && !params['*']) {
      if (width && width > 768) {
        navigate(`/${Paths.bookmarks}/all`);
      }
    }
  }, [width, params.id, params, navigate]);

  return (
    <Box h='100%'>
      <ShelfLayout>
        {width &&
          (width > 768 ||
            (width <= 768 && !(params.id || params['*']))) && (
            <ShelfLayoutShelf
              position='relative'
              as='aside'
              h='100%'
              w={{
                '@bp1': '100%',
                '@bp4': 300,
                '@bp5': 350,
              }}
              borderColor='base100'
              css={{
                flexShrink: 0,
              }}
            >
              <PageLayout
                t={{ '@bp1': 0, '@bp3': 65 }}
                b={0}
                overflowY='auto'
                h='100%'
                w={{
                  '@bp1': '100%',
                  '@bp4': 300,
                  '@bp5': 350,
                }}
                css={{
                  '@bp1': {
                    position: 'unset',
                  },
                  '@bp3': {
                    position: 'fixed',
                  },
                }}
              >
                <PageLayoutHeader
                  position='sticky'
                  t={0}
                  css={{ backgroundColor: '#FFF', zIndex: 10 }}
                >
                  Bookmarks
                  <CreateBookmarkGroup
                    onCreated={(id) =>
                      navigate(`/${Paths.bookmarks}/${id}`)
                    }
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
                </PageLayoutHeader>
                <PageLayoutContent>
                  <SearchBox
                    position='sticky'
                    t={58}
                    px={{ '@bp1': 2, '@bp3': 4 }}
                    py={4}
                    borderBottom={2}
                    borderColor='base100'
                    css={{ backgroundColor: '#FFF', zIndex: 10 }}
                  />
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<Loader loading={true} />}>
                      <BookmarkGroupsList />
                    </Suspense>
                  </ErrorBoundary>
                </PageLayoutContent>
              </PageLayout>
            </ShelfLayoutShelf>
          )}
        <ShelfLayoutShelf w='100%' role='contentinfo'>
          <Outlet />
        </ShelfLayoutShelf>
      </ShelfLayout>
    </Box>
  );
}
BookmarksPage.displayName = 'Bookmarks Page';

export default BookmarksPage;
