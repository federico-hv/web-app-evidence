import {
  DialogContextProvider,
  GenericProps,
  Loader,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useDialogContext,
} from '../../../shared';
import { Suspense, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  Popover,
  useDisclosure,
  useKeyBind,
  useSwitch,
} from '@holdr-ui/react';
import CreateBookmarkGroup, {
  CreateBookmarkGroupTrigger,
} from './create-bookmark-group';
import { ErrorBoundary } from 'react-error-boundary';
import {
  IBookmarkGroup,
  useCreateBookmark,
  useGetBookmarkGroups,
  useRemoveBookmark,
} from '../shared';
import { useFeedContext } from '../../feeds';
import { styled } from '../../../configs';

function PopoverItem({
  children,
  onClick,
  disabled,
}: GenericProps & { disabled?: boolean }) {
  return (
    <button disabled={disabled} onClick={onClick}>
      <Box
        cursor='pointer'
        radius='full'
        _hover={{ backgroundColor: '$base100' }}
        p={3}
        fontSize={2}
      >
        {children}
      </Box>
    </button>
  );
}

const FlexLabel = styled('label', {
  display: 'flex',
  flex: 1,
});

function SelectBookmarkGroup({ data }: { data: IBookmarkGroup }) {
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

function BookmarkGroupDialog() {
  const { isOpen, onOpen, onClose } = useDialogContext();

  const { feedId } = useFeedContext();

  const { data } = useGetBookmarkGroups(feedId);

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content w={425} css={{ backgroundColor: '#FFF' }}>
          <Dialog.Header
            justify='space-between'
            borderBottom={1}
            borderColor='base100'
            css={{ backgroundColor: '#FFF' }}
          >
            <Dialog.Close>
              <CloseButton type='button' variant='ghost' />
            </Dialog.Close>
            <HStack
              position='absolute'
              l={40}
              r={0}
              p={4}
              css={{
                zIndex: -1,
              }}
            >
              <Heading as='h1' casing='uppercase' size={3} weight={500}>
                Bookmark groups
              </Heading>
            </HStack>
            <CreateBookmarkGroup>
              <CreateBookmarkGroupTrigger>
                <Button rightIcon='add'>Create</Button>
              </CreateBookmarkGroupTrigger>
            </CreateBookmarkGroup>
          </Dialog.Header>
          <Dialog.Body
            direction='vertical'
            divider={<Box borderBottom={1} borderColor='base100' />}
          >
            {data.bookmarkGroups.edges.map(({ node }) => (
              <SelectBookmarkGroup key={node.id} data={node} />
            ))}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function BookmarkPopover({
  children,
  position = 'top',
  alignOffset = 0,
  sideOffset = 16,
}: GenericProps & {
  position?: 'top' | 'right';
  alignOffset?: number;
  sideOffset?: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { feedId } = useFeedContext();

  const { removeBookmark, loading: removeBookmarkLoading } =
    useRemoveBookmark();

  const { createBookmark } = useCreateBookmark();

  const [popoverOpen, set] = useState(false);
  const closePopover = () => set(false);

  // const closeAfter = async (id: string, cb: (id: string) => void) => {
  //   cb(id);
  //   onClose();
  // };

  // close with ESC key
  useKeyBind(27, closePopover);

  return (
    <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
      <Popover isOpen={popoverOpen} onOpenChange={set}>
        <Popover.Trigger asChild>
          <Box onClick={() => createBookmark(feedId)}>{children}</Box>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            p={2}
            align='center'
            side={position}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
            minWidth={1}
            radius='full'
            css={{ backgroundColor: '#FFF', zIndex: 20 }}
          >
            <HStack
              p={2}
              gap={3}
              items='center'
              divider={<Box h={1} w='1px' bgColor='base100' />}
            >
              <PopoverItem
                disabled={removeBookmarkLoading}
                onClick={() => removeBookmark(feedId)}
              >
                Remove bookmark
              </PopoverItem>
              <PopoverItem onClick={onOpen}>Add to group</PopoverItem>
            </HStack>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={<Loader loading={true} />}>
          <BookmarkGroupDialog />
        </Suspense>
      </ErrorBoundary>
    </DialogContextProvider>
  );
}
BookmarkPopover.displayName = 'BookmarkPopover';

export default BookmarkPopover;
