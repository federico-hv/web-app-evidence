import { Link } from 'react-router-dom';
import { HStack, Icon } from '@holdr-ui/react';
import { SettingsNavigationLinkProps } from './setting.type';

function SettingNavigationLink({
  active,
  label,
  to,
}: SettingsNavigationLinkProps) {
  return (
    <Link to={to}>
      <HStack
        justify='space-between'
        p={4}
        bgColor={active ? 'base100' : 'transparent'}
        _hover={{ backgroundColor: '$base100' }}
        borderLeft={active ? 2 : 0}
        borderColor='base600'
      >
        {label}
        <Icon name='caret-right-outline' />
      </HStack>
    </Link>
  );
}
SettingNavigationLink.displayName = 'SettingsNavigationLink';

export default SettingNavigationLink;
