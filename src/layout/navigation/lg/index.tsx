import {
  Logo,
  Responsive,
  ResponsiveItem,
} from '../../../shared/components';
import { Box, Container, HStack, IconButton } from '@holdr-ui/react';
import { Search } from '../../../features/search';
import MessagePopover from './message-popver';
import NotificationPopover from './notification-popoover';

function LgNavigation() {
  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <Box as='header' w='100%' h={80} position='fixed' zIndex={10}>
          <Container
            maxWidth={1280}
            css={{
              backgroundColor: '#141317',
            }}
          >
            <HStack placeholder='' h={64} w='100%' gap={4}>
              <HStack
                items='center'
                w={{ '@bp3': 90, '@bp7': 308 }}
                // bgColor='base500'
                h='100%'
              >
                <Logo />
              </HStack>
              <HStack flex={1} py={4} items='center' h='100%'>
                <Search />
              </HStack>
              <Box
                w={{ '@bp3': 150, '@bp5': 308 }}
                // bgColor='base500'
                h='100%'
              >
                <HStack
                  justify='flex-end'
                  gap={4}
                  w='100%'
                  h='100%'
                  items='center'
                >
                  <MessagePopover />
                  <NotificationPopover />
                  <IconButton
                    variant='ghost'
                    colorTheme='primary400'
                    icon='settings-outline'
                    ariaLabel='View settings'
                  />
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
