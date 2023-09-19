import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  useDisclosure,
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
  DialogContextProvider,
} from '../../shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  CreateBookmarkSchema,
  ICreateBookmarkGroup,
  useCreateBookmarkGroup,
} from '../../features';
import { Formik } from 'formik';
import { CreateBookmarkGroupValues } from './constants';
import { CreateBookmarkGroupDialog } from './ui';
import BookmarkGroupsList from './ui/bookmark-groups.list';

function BookmarksPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createBookmarkGroup } = useCreateBookmarkGroup();

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
          borderRight={2}
          borderColor='base100'
          css={{
            flexShrink: 0,
          }}
        >
          <PageLayout
            className='no-scrollbar'
            position='fixed'
            overflowY='auto'
            h='100%'
            w={{
              '@bp4': 300,
              '@bp5': 350,
            }}
          >
            <PageLayoutHeader>
              <HStack w='100%' justify='space-between' items='center'>
                Bookmarks
                <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
                  <Formik<ICreateBookmarkGroup>
                    initialValues={CreateBookmarkGroupValues}
                    validationSchema={CreateBookmarkSchema}
                    onSubmit={async (values, { resetForm }) => {
                      const id = await createBookmarkGroup(
                        values.name,
                        values.isPrivate,
                      );

                      if (id) {
                        onClose();
                        resetForm();
                        navigate(`/${Paths.bookmarks}/${id}`);
                      }
                    }}
                  >
                    <CreateBookmarkGroupDialog />
                  </Formik>
                </DialogContextProvider>
              </HStack>
            </PageLayoutHeader>
            <PageLayoutContent>
              <Box px={4} py={4} borderBottom={2} borderColor='base100'>
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
