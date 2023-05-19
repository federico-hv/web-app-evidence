import { Avatar, Center, Popover } from '@holdr-ui/react';
import { ProfilePopoverLgProps } from './profile-popover.types';
import { AuthenticatedProfileMenuLg } from '../../authenticated';

function ProfilePopoverLg({ currentUser }: ProfilePopoverLgProps) {
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
          <AuthenticatedProfileMenuLg currentUser={currentUser} />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ProfilePopoverLg.displayName = 'ProfilePopoverLg';

export default ProfilePopoverLg;
