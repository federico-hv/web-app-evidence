import { DialogContextProvider, GenericProps } from '../../../shared';
import { Fragment, Suspense, useState } from 'react';
import {
  Box,
  HStack,
  Popover,
  useDisclosure,
  useKeyBind,
} from '@holdr-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { useCreateBookmark, useRemoveBookmark } from '../shared';
import { useFeedContext } from '../../feeds';
import BookmarkGroupDialog from './bookmark-group.dialog';

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

  const closeAfter = async (
    id: string,
    cb: (...args: any[]) => Promise<boolean>,
  ) => {
    await cb(id);
    set(false);
  };

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
                onClick={() => closeAfter(feedId, removeBookmark)}
              >
                Remove bookmark
              </PopoverItem>
              <PopoverItem onClick={onOpen}>Add to group</PopoverItem>
            </HStack>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <ErrorBoundary fallback={<Fragment />}>
        <Suspense fallback={<Fragment />}>
          <BookmarkGroupDialog />
        </Suspense>
      </ErrorBoundary>
    </DialogContextProvider>
  );
}
BookmarkPopover.displayName = 'BookmarkPopover';

export default BookmarkPopover;
