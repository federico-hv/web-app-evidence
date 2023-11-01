import { IconButton, Popover } from '@holdr-ui/react';
import {
  NotificationHeader,
  NotificationTabs,
} from '../../../notifications';
import { useState } from 'react';

function NotificationPopover() {
  const [state, set] = useState(false);
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <IconButton
          colorTheme='primary400'
          icon='notification-outline'
          ariaLabel='View notifications'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          alignOffset={-50}
          sideOffset={20}
          align='end'
          h='calc(98.5vh - 68px)'
          w={400}
          zIndex={50}
        >
          <NotificationHeader />
          <NotificationTabs />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
