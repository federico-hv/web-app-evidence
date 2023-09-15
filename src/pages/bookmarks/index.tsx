import {
  Box,
  Button,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Switch,
  VStack,
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
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import BookmarkGroupsList from './ui/bookmark-groups.list';
import { ErrorBoundary } from 'react-error-boundary';

function CreateBookmarkGroupDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <IconButton
          variant='ghost'
          icon='add'
          ariaLabel='Create bookmark group'
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          css={{ backgroundColor: '#FFF', borderRadius: '25px' }}
          h={250}
        >
          <Dialog.Header
            justify='space-between'
            borderBottom={1}
            borderColor='base100'
            css={{ backgroundColor: '#FFF' }}
          >
            <HStack
              justify='center'
              position='absolute'
              l={0}
              r={0}
              p={4}
              css={{
                zIndex: -1,
              }}
            >
              <Heading as='h1' size={4} weight={500}>
                Create new group
              </Heading>
            </HStack>
            <Button disabled={true}>Save</Button>
          </Dialog.Header>
          <Dialog.Body h='100%'>
            <VStack gap={5} h='100%' pt={4} px={3}>
              <Box>
                <FormControl>
                  <Input variant='flushed' placeholder='Group Name' />
                  <FormControl.HelperText>0 / 60</FormControl.HelperText>
                </FormControl>
              </Box>
              <HStack>
                <TextGroup>
                  <TextGroupHeading as='h2' size={3}>
                    Public
                  </TextGroupHeading>
                  <TextGroupSubheading size={2} color='base400'>
                    Anyone will be able to view this bookmark group on your
                    profile
                  </TextGroupSubheading>
                </TextGroup>
                <Switch />
              </HStack>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

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
          borderRight={2}
          borderColor='base100'
          css={{
            flexShrink: 0,
          }}
        >
          <PageLayout
            position='fixed'
            w={{
              '@bp4': 300,
              '@bp5': 350,
            }}
          >
            <PageLayoutHeader>
              <HStack w='100%' justify='space-between' items='center'>
                Bookmarks
                <CreateBookmarkGroupDialog />
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
