import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import {
  BackButton,
  ErrorFallback,
  Head,
  Loader,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  Paths,
  ShelfLayout,
  ShelfLayoutShelf,
} from '../../shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Fragment, Suspense, useEffect } from 'react';
import CreateBookmarkGroup, {
  CreateBookmarkGroupTrigger,
} from '../../features/bookmarks/ui/create-bookmark-group';
import { ErrorBoundary } from 'react-error-boundary';
import BookmarkGroupsList from './ui/bookmark-groups.list';

function BookmarkPageHeader() {
  const navigate = useNavigate();

  return (
    <HStack
      w='100%'
      justify='space-between'
      items='center'
      fontSize={{ '@bp1': 3, '@bp3': 4 }}
    >
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
  );
}

function LgContent() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      navigate(`/${Paths.bookmarks}/all`);
    }
  }, [params, navigate]);

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
              <BookmarkPageHeader />
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

function SmContent() {
  const params = useParams();

  return (
    <Fragment>
      {!(params.id || params['*']) && (
        <VStack>
          <HStack
            gap={3}
            maxHeight={58}
            items='center'
            w='100%'
            p={4}
            borderBottom={1}
            borderColor='base100'
            fontSize={4}
            css={{
              fontSize: 'large',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            <BackButton />
            <BookmarkPageHeader />
          </HStack>
          <Box
            position='sticky'
            t={58}
            px={4}
            py={3}
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
        </VStack>
      )}
      {(params.id || params['*']) && <Outlet />}
    </Fragment>
  );
}

function BookmarksPage() {
  const windowSize = useWindowSize();
  return (
    <Fragment>
      {windowSize && windowSize.width && windowSize.width <= 768 && (
        <SmContent />
      )}
      {windowSize && windowSize.width && windowSize.width > 768 && (
        <LgContent />
      )}
    </Fragment>
  );
}
BookmarksPage.displayName = 'Bookmarks Page';

export default BookmarksPage;
