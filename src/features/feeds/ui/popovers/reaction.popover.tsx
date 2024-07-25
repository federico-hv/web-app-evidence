import { useState } from 'react';
import { Box, HStack, Popover, useKeyBind } from '@holdr-ui/react';
import { GenericProps, useActOnScroll } from '../../../../shared';
import {
  useFeedContext,
  useAddReactionAction,
  FeedReactionActions,
  useRemoveReactionAction,
} from '../../shared';
import { FeedReactionName } from '../../shared';
import { ReactionButton } from '../buttons';

function ReactionPopover({
  children,
  position = 'top',
  alignOffset = 0,
  sideOffset = 16,
}: GenericProps & {
  position?: 'top' | 'right';
  alignOffset?: number;
  sideOffset?: number;
}) {
  const { isLiked, feedId } = useFeedContext();
  const { addReaction } = useAddReactionAction();
  const { removeReaction } = useRemoveReactionAction();

  const reaction = isLiked ? 'love' : null;

  const [isOpen, set] = useState(false);
  const onClose = () => set(false);

  const actionFor = async (reaction: FeedReactionName) => {
    if (reactionIs(reaction)) {
      await removeReaction(feedId, reaction);
    } else {
      await addReaction(feedId, reaction);
    }
    onClose();
  };

  const reactionIs = (name: FeedReactionName): boolean => {
    return reaction === name;
  };

  // close with ESC key
  useKeyBind(27, onClose);

  // close when scrolling
  useActOnScroll(10, onClose);

  return (
    <Popover isOpen={isOpen} onOpenChange={set}>
      <Popover.Trigger asChild>
        <Box>{children}</Box>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          p={2}
          side={position}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          minWidth={1}
          radius='full'
          css={{
            backgroundColor: '#FFF',
            zIndex: 20,
          }}
        >
          <HStack
            h='100%'
            w='100%'
            p={{ '@bp1': 1, '@bp3': 2 }}
            gap={3}
            items='center'
            divider={<Box h={1} w='1px' bgColor='base100' />}
          >
            {FeedReactionActions.map(({ name, icon }) => (
              <ReactionButton
                key={`${name} reaction`}
                name={name}
                onClick={() => actionFor(name)}
                active={reactionIs(name)}
                icon={icon.name}
                colorCode={icon.color}
              />
            ))}
          </HStack>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ReactionPopover.displayName = 'ReactionPopover';

export default ReactionPopover;
