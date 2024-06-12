import {
  Box,
  Button,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Input,
  Overlay,
  Switch,
  useDisclosure,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import { Route, Routes } from 'react-router';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  makeButtonLarger,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../shared';
import {
  ICreateBookmarkGroup,
  useCreateBookmarkGroup,
  useRenameBookmarkGroup,
} from '../../features';

function CreateBookmarkGroup() {
  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();

  const [state, update] = useRecordState<ICreateBookmarkGroup>({
    name: '',
    isPrivate: false,
  });

  const { loading, createBookmarkGroup } = useCreateBookmarkGroup();

  return (
    <VStack>
      <Box borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)' p={4}>
        <Heading color='white500' weight={400} size={4} as='h2'>
          Create Bookmark Group
        </Heading>
      </Box>
      <VStack as='form' px={4} pb={4} gap={5} h='100%'>
        <Box>
          <FormControl>
            <Input
              autoFocus
              onChange={(e) => update({ name: e.target.value })}
              name={state.name}
              value={state.name}
              color='white500'
              focusColor='purple500'
              type='text'
              maxLength={60}
              variant='flushed'
              placeholder='Group Name'
            />
            <FormControl.HelperText>
              {state.name.length} / 60
            </FormControl.HelperText>
          </FormControl>
        </Box>
        <HStack gap={2}>
          <TextGroup>
            <TextGroupHeading
              color='white500'
              as='h2'
              size={{ '@bp1': 2, '@bp3': 3 }}
            >
              Public
            </TextGroupHeading>
            <TextGroupSubheading
              color='white700'
              size={{ '@bp1': 1, '@bp3': 2 }}
            >
              Anyone will be able to view this bookmark group on your
              profile
            </TextGroupSubheading>
          </TextGroup>
          <Switch
            colorTheme='purple500'
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            name='isPrivate'
            onChange={(e) => {
              update({ isPrivate: !!e.target.value });
            }}
            defaultChecked={false}
            value={`${state.isPrivate}`}
            checked={state.isPrivate}
          />
        </HStack>
        <Button
          type='submit'
          disabled={state.name.length === 0}
          isLoading={loading}
          loadingText='Create Group'
          onClick={async () => {
            await createBookmarkGroup(state.name, state.isPrivate).then(
              () => navigate(previousLocation),
            );
          }}
          colorTheme='purple500'
          fullWidth
          radius={2}
          className={makeButtonLarger('2.5rem', '15px')}
        >
          Create Group
        </Button>
      </VStack>
    </VStack>
  );
}

function RenameBookmarkGroup() {
  const { id } = useParams();
  const { state: locState } = useLocation();

  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();

  const [state, update] = useRecordState<ICreateBookmarkGroup>({
    name: locState.name.trim() || '',
    isPrivate: false,
  });

  const { loading, renameBookmarkGroup } = useRenameBookmarkGroup();

  return (
    <VStack>
      <Box borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)' p={4}>
        <Heading color='white500' weight={400} size={4} as='h2'>
          Rename Bookmark Group
        </Heading>
      </Box>
      <VStack as='form' px={4} pb={4} gap={5} h='100%'>
        <Box>
          <FormControl>
            <Input
              autoFocus
              onChange={(e) => update({ name: e.target.value })}
              name={state.name}
              value={state.name}
              color='white500'
              focusColor='purple500'
              type='text'
              maxLength={60}
              variant='flushed'
              placeholder='Group Name'
            />
            <FormControl.HelperText>
              {state.name.length} / 60
            </FormControl.HelperText>
          </FormControl>
        </Box>
        <Button
          type='submit'
          disabled={state.name.length === 0}
          isLoading={loading}
          loadingText='Edit Group'
          onClick={async () => {
            await renameBookmarkGroup(id || '', state.name).then(() =>
              navigate(previousLocation),
            );
          }}
          colorTheme='purple500'
          fullWidth
          radius={2}
          className={makeButtonLarger('2.5rem', '15px')}
        >
          Edit Group
        </Button>
      </VStack>
    </VStack>
  );
}

function BookmarkGroupActionDialog() {
  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();
  const disclosure = useDisclosure(true);

  return (
    <Dialog
      ariaDescribedBy=''
      {...disclosure}
      onClose={() => navigate(previousLocation)}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Body bgColor='rgb(48, 48, 75)' px={0} py={0}>
            <Outlet />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

const BookmarkGroupActionRoutes = () => (
  <Routes>
    <Route path='' element={<BookmarkGroupActionDialog />}>
      <Route path='create' element={<CreateBookmarkGroup />} />
      <Route path='rename/:id' element={<RenameBookmarkGroup />} />
    </Route>
  </Routes>
);

BookmarkGroupActionRoutes.displayName = 'BookmarksGroupRoutes';

export default BookmarkGroupActionRoutes;
