import { Avatar, Center, Popover } from '@holdr-ui/react';
import { ProfileCardLg } from '../../cards';
import { ProfileMenuProps } from './profile-menu.types';

function ProfileMenu({ currentUser }: ProfileMenuProps) {
  return (
    <Popover>
      <Popover.Trigger>
        <Center>
          <Avatar
            src={currentUser.avatar}
            name={currentUser.displayName}
            size='sm'
          />
        </Center>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content zIndex={50} sideOffset={10} align='end'>
          <ProfileCardLg currentUser={currentUser} />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ProfileMenu.displayName = 'ProfileMenu';

export default ProfileMenu;
