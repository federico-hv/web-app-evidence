import { Box, Container, HStack } from '@holdr-ui/react';
import { Logo, Responsive, ResponsiveItem } from '../../../shared';
import { Search } from '../../../features/search';
import MessagePopover from './message-popover';
import NotificationPopover from './notification-popoover';
import SettingsPopover from './settings-popover';

function LgNavigation() {
  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <Box as='header' w='100%' h={80} position='fixed' t={0} zIndex={5}>
          <Container
            maxWidth={1280}
            css={{
              backgroundColor: '#141317',
            }}
          >
            <HStack h={64} w='100%' gap={4} as='nav'>
              <HStack
                items='center'
                w={{ '@bp3': 90, '@bp7': 308 }}
                h='100%'
              >
                <Logo />
              </HStack>
              <HStack flex={1} py={4} items='center' h='100%'>
                <Search />
              </HStack>
              <Box w={{ '@bp3': 150, '@bp5': 308 }} h='100%'>
                <HStack
                  justify='flex-end'
                  gap={4}
                  w='100%'
                  h='100%'
                  items='center'
                >
                  <NotificationPopover />
                  <MessagePopover />
                  <SettingsPopover />
                </HStack>
              </Box>
            </HStack>
          </Container>
          {/*Useful spacer between nav and content*/}
          {/*Stops content from above the container showing as you scroll */}
          <Container maxWidth={1280}>
            <Box
              h={16}
              w='100%'
              css={{
                backgroundColor: '#141317',
              }}
            />
          </Container>
        </Box>
      </ResponsiveItem>
    </Responsive>
  );
}
LgNavigation.displayName = 'LgNavigation';

export default LgNavigation;
