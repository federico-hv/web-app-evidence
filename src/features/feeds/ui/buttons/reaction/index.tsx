import { useFeedContext } from '../../../shared';
import { Center, Icon, useSwitch } from '@holdr-ui/react';
import { ReactionButtonProps } from './types';

function ReactionButton({
  onClick,
  active,
  name,
  icon,
  colorCode,
}: ReactionButtonProps) {
  const { switchState, turnOff, turnOn } = useSwitch(active);
  const { feedId } = useFeedContext(); // no need for this

  return (
    <Center
      p={3}
      radius='full'
      fontSize={4}
      cursor='pointer'
      onPointerEnter={turnOn}
      onPointerLeave={turnOff}
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
        name={active || switchState ? icon.active : icon.inactive}
        aria-label={name}
      />
    </Center>
  );
}
ReactionButton.displayName = 'ReactionButton';

export default ReactionButton;
