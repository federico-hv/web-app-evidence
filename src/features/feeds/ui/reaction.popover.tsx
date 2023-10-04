import { useState } from 'react';
import {
  Box,
  Center,
  HStack,
  Icon,
  Popover,
  useKeyBind,
} from '@holdr-ui/react';
import { GenericProps, useActOnScroll } from '../../../shared';
import {
  useFeedContext,
  useAddReactionAction,
  FeedReactionActions,
} from '../shared';
import { IconName } from '@holdr-ui/react/dist/shared/types';
import { FeedReactionName } from '../shared';
import { useRemoveReactionAction } from '../shared/hooks/use-remove-reaction-action';

function ReactionButton({
  onClick,
  active,
  name,
  icon,
  colorCode,
}: {
  onClick: (id: string) => Promise<void>;
  active?: boolean;
  name: string;
  icon: { active: IconName; inactive: IconName };
  colorCode: { hover: string; active: string };
}) {
  const { feedId } = useFeedContext(); // no need for this

  return (
    <Center
      p={3}
      radius='full'
      fontSize={4}
      cursor='pointer'
      onClick={async () => await onClick(feedId)}
      _hover={{
        backgroundColor: colorCode.hover,
        color: colorCode.active,
      }}
      css={{
        transition: 'all 0.25s ease',
        color: active ? colorCode.active : '',
        '&:active': { scale: 0.9 },
      }}
    >
      <Icon
        size={{ '@bp1': 'sm', '@bp3': 'base' }}
        name={active ? icon.active : icon.inactive}
        aria-label={name}
      />
    </Center>
  );
}

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
  const { reaction, feedId } = useFeedContext();
  const { addReaction } = useAddReactionAction();
  const { removeReaction } = useRemoveReactionAction();

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
  useActOnScroll('#root', 10, onClose);

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
          css={{ backgroundColor: '#FFF', zIndex: 20 }}
        >
          <HStack
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
