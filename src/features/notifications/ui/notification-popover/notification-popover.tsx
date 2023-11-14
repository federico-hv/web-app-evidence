import {
  IconButton,
  Popover,
  useDisclosure,
  useKeyBind,
} from '@holdr-ui/react';
import { NotificationHeader, NotificationTabs } from '../..';

function NotificationPopover() {
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  // close with ESC key
  useKeyBind(27, () => {
    onClose();
  });

  return (
    <Popover isOpen={isOpen} onOpenChange={isOpen ? onClose : onOpen}>
      <Popover.Trigger onClick={isOpen ? onClose : onOpen}>
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
          <NotificationHeader />
          <NotificationTabs onClose={onClose} />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
