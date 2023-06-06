import { useState } from 'react';
import { Avatar, Center, Popover } from '@holdr-ui/react';
import { ProfilePopoverLgProps } from './profile-popover.types';
import { AuthenticatedProfileMenuLg } from '../../authenticated';

function ProfilePopoverLg({ currentUser }: ProfilePopoverLgProps) {
  const [state, set] = useState(false);
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <Center>
          <Avatar
            src={currentUser.avatar}
            name={currentUser.displayName}
            size='sm'
          />
        </Center>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          maxWidth={300}
          zIndex={50}
          sideOffset={10}
          align='end'
        >
          <AuthenticatedProfileMenuLg
            onClose={() => set(false)}
            currentUser={currentUser}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ProfilePopoverLg.displayName = 'ProfilePopoverLg';

export default ProfilePopoverLg;
