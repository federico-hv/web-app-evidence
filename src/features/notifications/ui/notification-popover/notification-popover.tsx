import { IconButton, Popover, useKeyBind } from '@holdr-ui/react';
import { NotificationHeader, NotificationTabs } from '../..';
import { useState } from 'react';
import { PopoverContextProvider } from 'shared';

function NotificationPopover() {
  const [state, set] = useState(false);

  // close with ESC key
  useKeyBind(27, () => {
    set(false);
  });

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
          css={{ backgroundColor: '#fff' }}
          px='$5'
        >
          <PopoverContextProvider
            value={{
              setOpen: () => set(true),
              setClosed: () => set(false),
              isOpen: state,
            }}
          >
            <NotificationHeader />
            <NotificationTabs />
          </PopoverContextProvider>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
