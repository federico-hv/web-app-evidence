import { Avatar, Center, Popover } from '@holdr-ui/react';
import { IUserSm } from 'shared';
import { ProfileCardLg } from '../../cards';

function ProfileMenu() {
  const currentUser: IUserSm = {
    displayName: 'Got Sauce',
    username: 'trent45',
    avatarUrl: '',
  };

  return (
    <Popover>
      <Popover.Trigger>
        <Center>
          <Avatar
            src={currentUser.avatarUrl}
            name={currentUser.displayName}
            size='sm'
          />
        </Center>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={10} align='end'>
          <ProfileCardLg currentUser={currentUser} />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ProfileMenu.displayName = 'ProfileMenu';

export default ProfileMenu;
