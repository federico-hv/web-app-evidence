import { Box, Container, HStack, VStack } from '@holdr-ui/react';
import { Logo, Responsive, ResponsiveItem } from '../../../shared';
import { Search } from '../../../features/search';
import NotificationPopover from './notification-popoover';
import SettingsPopover from './settings-popover';
import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

function Navigation({ children, ...props }: BoxProps) {
  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <Box
          as='header'
          w='100%'
          h={80}
          position='fixed'
          t={0}
          zIndex={10}
          {...props}
        >
          <VStack>{children}</VStack>
        </Box>
      </ResponsiveItem>
    </Responsive>
  );
}
Navigation.displayName = 'Navigation';

function NavigationLogo() {
  return (
    <HStack
      items='center'
      w={{ '@bp3': 90, '@bp7': 308 }}
      shrink={0}
      h='100%'
    >
      <Logo />
    </HStack>
  );
}
NavigationLogo.displayName = 'NavigationLogo';

function NavigationSpacer() {
  return (
    <Box
      h={16}
      w='100%'
      css={{
        backgroundColor: '#141317',
      }}
    />
  );
}
NavigationSpacer.displayName = 'NavigationSpacer';

function NavigationSearch() {
  return (
    <HStack flex={1} p={4} w='100%' items='center' h='100%'>
      <Search />
    </HStack>
  );
}
NavigationSearch.displayName = 'NavigationSearch';

function NavigationActions(props: HStackProps) {
  return (
    <HStack
      justify='flex-end'
      gap={4}
      w={{ '@bp3': 150, '@bp5': 308 }}
      h='100%'
      items='center'
      {...props}
    />
  );
}
NavigationActions.displayName = 'NavigationActions';

function NavigationContent({ children, ...props }: BoxProps) {
  return (
    <Box bgColor='#141317' {...props}>
      <Container maxWidth={1280}>
        <HStack justify='space-between' h={64} w='100%' gap={4} as='nav'>
          {children}
        </HStack>
      </Container>
    </Box>
  );
}
NavigationContent.displayName = 'NavigationContent';

function NavigationNotificationsPopover() {
  return <NotificationPopover />;
}
NavigationNotificationsPopover.displayName =
  'NavigationNotificationsPopover';

function NavigationSettingsPopover() {
  return <SettingsPopover />;
}
NavigationSettingsPopover.displayName = 'NavigationSettingsPopover';

export {
  NavigationSearch,
  NavigationSpacer,
  NavigationContent,
  NavigationActions,
  NavigationLogo,
  NavigationSettingsPopover,
  NavigationNotificationsPopover,
  Navigation,
};
