import { HStack, Icon, Text } from '@holdr-ui/react';
import { ProfileDrawerOptionProps } from './types';
import { LinkOverlay } from '../../shared';

function ProfileDrawerOption({
  label,
  icon,
  to,
  onClick,
}: ProfileDrawerOptionProps) {
  return (
    <HStack
      position='relative'
      p={4}
      gap={3}
      items='center'
      cursor='pointer'
      onClick={onClick}
      _hover={{ backgroundColor: '$base100' }}
    >
      {to && <LinkOverlay to={to} />}
      <Icon name={icon} />
      <Text size={2}>{label}</Text>
    </HStack>
  );
}
ProfileDrawerOption.displayName = 'ProfileDrawerOption';

export default ProfileDrawerOption;
