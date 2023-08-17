import { useState } from 'react';
import {
  Box,
  Center,
  HStack,
  Icon,
  Popover,
  useKeyBind,
} from '@holdr-ui/react';
import { GenericProps } from '../../../shared';
import { useFeedContext, useAddReactionAction } from '../shared';

import { IconName } from '@holdr-ui/react/dist/shared/types';
import { FeedReactionName } from '../shared/types';
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
  count?: number;
  name: string;
  icon: { active: IconName; inactive: IconName };
  colorCode: { hover: string; active: string };
}) {
  const { feedId } = useFeedContext();

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
        name={active ? icon.active : icon.inactive}
        aria-label={name}
      />
      {/*{count !== undefined && count > 0 && active && (*/}
      {/*  <Box ml={3}>*/}
      {/*    <Text size={2}>{count}</Text>*/}
      {/*  </Box>*/}
      {/*)}*/}
    </Center>
  );
}

// TODO: Store the current reaction locally
// - Click reaction => Update local state, run mutation
// - Consider passing th e current reaction as an arg to mutation hook,
//    can use that to optimistically update state.

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
  const { reaction } = useFeedContext();
  const { love, indifference, excited, saddened } = useAddReactionAction();
  const {
    removeLove,
    removeIndifference,
    removeExcitement,
    removeSadness,
  } = useRemoveReactionAction();

  const [isOpen, set] = useState(false);
  const onClose = () => set(false);

  const closeAfter = async (id: string, cb: (id: string) => void) => {
    cb(id);
    onClose();
  };

  const reactionIs = (name: FeedReactionName): boolean => {
    return !!reaction && reaction.name === name;
  };

  const getCount = () => {
    return reaction ? reaction.count : undefined;
  };

  // close with ESC key
  useKeyBind(27, onClose);

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
          minHeight={48}
          radius='full'
          css={{ backgroundColor: '#FFF', zIndex: 20 }}
        >
          <HStack
            p={2}
            gap={3}
            items='center'
            divider={<Box h={1} w='1px' bgColor='base100' />}
          >
            <ReactionButton
              name='love'
              onClick={(id) =>
                closeAfter(id, reactionIs('love') ? removeLove : love)
              }
              active={reactionIs('love')}
              count={getCount()}
              icon={{ inactive: 'heart-outline', active: 'heart-fill' }}
              colorCode={{ active: '#de4747', hover: '#f4525226' }}
            />
            <ReactionButton
              name='excited'
              onClick={(id) =>
                closeAfter(
                  id,
                  reactionIs('excited') ? removeExcitement : excited,
                )
              }
              active={reactionIs('excited')}
              count={getCount()}
              icon={{
                inactive: 'emotion-happy-outline',
                active: 'emotion-happy-fill',
              }}
              colorCode={{
                active: '#c2c05a',
                hover: 'rgba(229,193,31,0.15)',
              }}
            />
            <ReactionButton
              name='sad'
              onClick={(id) =>
                closeAfter(
                  id,
                  reactionIs('sad') ? removeSadness : saddened,
                )
              }
              active={reactionIs('sad')}
              count={getCount()}
              icon={{
                inactive: 'emotion-sad-outline',
                active: 'emotion-sad-fill',
              }}
              colorCode={{
                active: '#2468c4',
                hover: 'rgba(72,158,173,0.15)',
              }}
            />
            <ReactionButton
              name='indifferent'
              onClick={(id) =>
                closeAfter(
                  id,
                  reactionIs('indifferent')
                    ? removeIndifference
                    : indifference,
                )
              }
              active={reactionIs('indifferent')}
              count={getCount()}
              icon={{
                inactive: 'emotion-normal-outline',
                active: 'emotion-normal-fill',
              }}
              colorCode={{
                active: '#1c9110',
                hover: 'rgba(93,204,52,0.15)',
              }}
            />
          </HStack>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ReactionPopover.displayName = 'ReactionPopover';

export default ReactionPopover;
