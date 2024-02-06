import { GenericProps } from '../../interfaces';
import { MenuItemProps, SCNames } from './types';
import { getSubComponent, hexToRGB } from '../../utilities';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import {
  Box,
  Button,
  Drawer,
  HStack,
  Icon,
  IconButton,
  Popover,
  Stack,
  Text,
  useDisclosure,
  useKeyBind,
  VStack,
} from '@holdr-ui/react';
import { MenuContextProvider } from './context';
import { Fragment, useState } from 'react';
import Responsive, { ResponsiveItem } from '../responsive';
import { extraBtnPadding } from '../../styles';
import { IconName } from '@holdr-ui/react/dist/shared/types';
import { useActOnScroll } from '../../hooks';
import { theme } from '../../../configs';

function Menu({
  children,
  align = 'end',
  offset = 5,
}: GenericProps & {
  align?: 'start' | 'end' | 'center';
  offset?: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isPopoverOpen, setIsOpenPopover] = useState(false);

  const closePopover = () => setIsOpenPopover(false);

  const Header = getSubComponent<SCNames>(children, 'MenuHeader');
  const Trigger = getSubComponent<SCNames>(children, 'MenuTrigger');
  const Content = getSubComponent<SCNames>(children, 'MenuContent');

  // close on clicking ESCAPE key
  useKeyBind(27, closePopover);

  // close popover after scroll
  useActOnScroll(10, closePopover);

  return (
    <MenuContextProvider value={{ isOpen, onOpen, onClose }}>
      <Responsive>
        <ResponsiveItem tablet='hide'>
          <Popover isOpen={isPopoverOpen} onOpenChange={setIsOpenPopover}>
            <Popover.Trigger asChild>
              <Box>{Trigger}</Box>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                minWidth={325}
                side='bottom'
                align={align}
                sideOffset={offset}
                boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                css={{
                  borderRadius: '$4',
                  border: '1px solid rgba(152, 152, 255, 0.10)',
                  background: ' rgba(56, 56, 140, 0.25)',
                  boxShadow: '0px 0px 100px 0px rgba(14, 14, 27, 0.35)',
                  backdropFilter: 'blur(50px)',
                }}
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
                  w='full'
                  minHeight='1px'
                  divider={
                    <Box
                      h='1px'
                      w='100%'
                      css={{ background: 'rgba(152, 152, 255, 0.10)' }}
                    />
                  }
                  css={{
                    backgroundColor: '#fff',
                    borderTopLeftRadius: '$3',
                    borderTopRightRadius: '$3',
                  }}
                >
                  {Header}
                  {Content}
                  <VStack px={4} py={4} flex={1} justify='center'>
                    <Button
                      size={{ '@bp1': 'sm', '@bp3': 'base' }}
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
          size={{ '@bp1': 'sm', '@bp3': 'base' }}
          variant='ghost'
          icon='more-fill'
          color='primary400'
          ariaLabel='view options'
        />
      )}
    </Box>
  );
}
MenuTrigger.displayName = 'MenuTrigger';

function MenuHeader({ children, ...props }: StackProps) {
  return (
    <Stack minHeight={40} {...props}>
      {children}
    </Stack>
  );
}
MenuHeader.displayName = 'MenuHeader';

function MenuContent({ children }: GenericProps) {
  const Items = getSubComponent<SCNames>(children, 'MenuItem');

  return (
    <VStack
      divider={
        <Box
          h='1px'
          w='100%'
          css={{ background: 'rgba(152, 152, 255, 0.10)' }}
        />
      }
    >
      {Items}
    </VStack>
  );
}
MenuContent.displayName = 'MenuContent';

function MenuItem({
  icon,
  label,
  action,
  dangerous,
  children,
}: MenuItemProps) {
  return (
    <HStack
      as='button'
      justify='space-between'
      role='button'
      items='center'
      radius={2}
      cursor='pointer'
      p={4}
      color='primary400'
      _hover={{
        backgroundColor: dangerous
          ? 'rgba(255,205,205,0.38)'
          : hexToRGB('#0E0E1B', 0.5),
        color: dangerous ? '$danger' : '$primary400',
      }}
      onClick={action}
      css={{
        userSelect: 'none',
        transitionDuration: theme.transitions['duration-fast'],
        transitionTimingFunction: 'ease-in',
        transitionProperty: theme.transitions['property-all'],
      }}
    >
      {!children ? (
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>{label}</Text>
      ) : (
        <Fragment>{children}</Fragment>
      )}
      {icon && !(icon as JSX.Element).props ? (
        <Icon name={icon as IconName} />
      ) : (
        <Fragment>{icon}</Fragment>
      )}
    </HStack>
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
