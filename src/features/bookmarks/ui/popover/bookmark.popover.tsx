import {
  GenericProps,
  makePath,
  Paths,
  useActOnScroll,
} from '../../../../shared';
import { useCallback, useState } from 'react';
import { Box, HStack, Popover, useKeyBind } from '@holdr-ui/react';
import { useFeedContext } from '../../../feeds';
import { PopoverButton } from '../buttons';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useCreateBookmarkMutation,
  useRemoveBookmarkMutation,
} from '../../mutations';

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
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { feedId } = useFeedContext();

  const { removeBookmark } = useRemoveBookmarkMutation();

  const { createBookmark } = useCreateBookmarkMutation();

  const [popoverOpen, set] = useState(false);

  const closePopover = useCallback(() => set(false), []);

  const closeAfter = async (
    id: string,
    cb: (...args: any[]) => Promise<any>,
  ) => {
    await cb(id);
    set(false);
  };

  // close with ESC key
  useKeyBind(27, closePopover);

  // close when scrolling
  useActOnScroll(10, closePopover);

  return (
    <Popover isOpen={popoverOpen} onOpenChange={set}>
      <Popover.Trigger asChild>
        <Box onClick={() => createBookmark(feedId)}>{children}</Box>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          p={0}
          align='center'
          side={position}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          minWidth={1}
          radius='full'
          zIndex={5}
          shadow='lg'
          css={{
            backgroundColor: 'rgba(101,101,218,0.25)',
            backdropFilter: 'blur(50px)',
          }}
        >
          <HStack
            p={{ '@bp1': 1, '@bp3': 1 }}
            gap={3}
            items='center'
            divider={<Box h={1} w='1px' bgColor='base100' />}
          >
            <PopoverButton
              onClick={() => closeAfter(feedId, removeBookmark)}
            >
              Remove bookmark
            </PopoverButton>
            <PopoverButton
              onClick={() =>
                navigate(makePath([Paths.bookmarks, 'save']), {
                  state: { previousLocation: pathname, feedId },
                })
              }
            >
              Add to group
            </PopoverButton>
          </HStack>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
BookmarkPopover.displayName = 'BookmarkPopover';

export default BookmarkPopover;
