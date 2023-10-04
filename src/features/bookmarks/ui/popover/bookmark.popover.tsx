import {
  DialogContextProvider,
  GenericProps,
  useActOnScroll,
} from '../../../../shared';
import { Fragment, Suspense, useCallback, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Popover,
  useDisclosure,
  useKeyBind,
} from '@holdr-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { useCreateBookmark, useRemoveBookmark } from '../../shared';
import { useFeedContext } from '../../../feeds';
import { BookmarkGroupDialog } from '../dialogs';
import { css } from '../../../../configs';
import { PopoverButton } from '../buttons';

const popoverButton = css({
  height: 'fit-content !important',
  padding: '$3 !important',
  '@bp1': { fontSize: '$1' },
  '@bp3': { fontSize: '$2' },
});

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

  const closePopover = useCallback(() => set(false), []);

  const closeAfter = async (
    id: string,
    cb: (...args: any[]) => Promise<boolean>,
  ) => {
    await cb(id);
    set(false);
  };

  // close with ESC key
  useKeyBind(27, closePopover);

  // close when scrolling
  useActOnScroll('#root', 10, closePopover);

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
              p={{ '@bp1': 1, '@bp3': 2 }}
              gap={3}
              items='center'
              divider={<Box h={1} w='1px' bgColor='base100' />}
            >
              <Button
                variant='ghost'
                disabled={removeBookmarkLoading}
                onClick={() => closeAfter(feedId, removeBookmark)}
                className={popoverButton()}
              >
                Remove bookmark
              </Button>
              <PopoverButton onClick={onOpen}>Add to group</PopoverButton>
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
