import { GenericProps } from '../../interfaces';
import { MenuItemProps, SCNames } from './types';
import MenuButton from '../menu-button';
import { getSubComponent } from '../../utilities';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Popover,
  Stack,
  useDisclosure,
  useKeyBind,
  VStack,
} from '@holdr-ui/react';
import { MenuContextProvider } from './context';
import { useState } from 'react';
import Responsive, { ResponsiveItem } from '../responsive';
import { extraBtnPadding } from '../../styles';

function Menu({ children }: GenericProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isPopoverOpen, setIsOpenPopover] = useState(false);

  const closePopover = () => setIsOpenPopover(false);

  const Header = getSubComponent<SCNames>(children, 'MenuHeader');
  const Trigger = getSubComponent<SCNames>(children, 'MenuTrigger');
  const Content = getSubComponent<SCNames>(children, 'MenuContent');

  useKeyBind(27, closePopover);

  return (
    <MenuContextProvider value={{ isOpen, onOpen, onClose }}>
      <Responsive>
        <ResponsiveItem tablet='hide'>
          <Popover isOpen={isPopoverOpen} onOpenChange={setIsOpenPopover}>
            <Popover.Trigger>{Trigger}</Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                minWidth={325}
                side='bottom'
                align='end'
                sideOffset={5}
                boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              >
                {Content}
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </ResponsiveItem>
        <ResponsiveItem mobile='show' tablet='show'>
          <Box onClick={onOpen}>{Trigger}</Box>
          <Drawer isOpen={isOpen} onClose={onClose}>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content>
                <VStack
                  radius={3}
                  bgColor='primary400'
                  w='full'
                  minHeight='1px'
                  divider={<Box borderBottom={1} borderColor='base100' />}
                >
                  {Header}
                  {Content}
                  <VStack px={4} py={4} flex={1} justify='center'>
                    <Button
                      className={extraBtnPadding()}
                      fullWidth
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </VStack>
                </VStack>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer>
        </ResponsiveItem>
      </Responsive>
    </MenuContextProvider>
  );
}
Menu.displayName = 'Menu';

function MenuTrigger({ children }: GenericProps) {
  return (
    <Box>
      {children ? (
        <>{children}</>
      ) : (
        <IconButton
          variant='ghost'
          icon='more-fill'
          ariaLabel='view options'
        />
      )}
    </Box>
  );
}
MenuTrigger.displayName = 'MenuTrigger';

function MenuHeader({ children, ...props }: StackProps) {
  const Header = getSubComponent<SCNames>(children, 'MenuHeader');

  return (
    <Stack minHeight={40} {...props}>
      {Header}
    </Stack>
  );
}
MenuHeader.displayName = 'MenuHeader';

function MenuContent({ children }: GenericProps) {
  const Items = getSubComponent<SCNames>(children, 'MenuItem');

  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      {Items}
    </VStack>
  );
}
MenuContent.displayName = 'MenuContent';

function MenuItem({ icon, label, action, dangerous }: MenuItemProps) {
  return (
    <MenuButton
      icon={icon}
      label={label}
      dangerous={dangerous}
      onClick={action}
    />
  );
}
MenuItem.displayName = 'MenuItem';

// Menu Subcomponents
Menu.Item = MenuItem;
Menu.Content = MenuContent;
Menu.Header = MenuHeader;
Menu.Trigger = MenuTrigger;

export { MenuTrigger, MenuContent, MenuItem, MenuHeader };

export default Menu;
