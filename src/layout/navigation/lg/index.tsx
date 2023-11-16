import {
  Logo,
  Responsive,
  ResponsiveItem,
} from '../../../shared/components';
import { Box, Container, Flex, HStack } from '@holdr-ui/react';
import { Search } from '../../../features/search';
import MessagePopover from './message-popver';
import ProfileMenu from './profile-menu';
import NotificationPopover from './notification-popoover';

function LgNavigation() {
  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <HStack
          as='header'
          items='center'
          position='fixed'
          t={0}
          w='100%'
          borderBottom={1}
          borderColor='base100'
          boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
          css={{
            backgroundColor: '#fbfbfa',
            '@bp1': { display: 'none' },
            '@bp3': { display: 'flex' },
            zIndex: 15,
          }}
        >
          <Box px={5} py={4} w={{ '@bp1': 75, '@bp7': 375 }}>
            <Logo />
          </Box>

          <Box
            h='2rem'
            w={{
              '@bp1': 'calc(100% - 235px)',
              '@bp5': 'calc(100% - 450px)',
              '@bp7': 'calc(100% - 750px)',
            }}
          >
            <Container maxWidth={600}>
              <Search />
            </Container>
          </Box>
          <Flex
            py={4}
            pr={5}
            w={{ '@bp1': 160, '@bp5': 375 }}
            items='center'
            justify='flex-end'
          >
            <HStack gap={4}>
              <MessagePopover />
              <NotificationPopover />
              <ProfileMenu />
            </HStack>
          </Flex>
        </HStack>
      </ResponsiveItem>
    </Responsive>
  );
}
LgNavigation.displayName = 'LgNavigation';

export default LgNavigation;
