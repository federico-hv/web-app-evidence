import { Box, VStack } from '@holdr-ui/react';
import { NavigationList } from './ui';
import { RadialSurface } from '../../shared';
import {
  MyMembershipList,
  MyMembersList,
  useCurrentUser,
  UserRoleEnum,
  WatchlistList,
} from '../../features';

function Header() {
  const currentUser = useCurrentUser();
  return (
    <Box
      as='header'
      w={{ '@bp4': 90, '@bp7': 308 }}
      h='calc(100% - 80px)'
      display={{ '@bp1': 'none', '@bp4': 'block' }}
    >
      <Box
        position='fixed'
        w={{ '@bp4': 90, '@bp7': 308 }}
        h='calc(100% - 80px)'
        t={80}
        pb={4}
      >
        <VStack
          gap={4}
          w={{ '@bp4': 90, '@bp7': 308 }}
          h='100%'
          overflowY='auto'
          className='hide-scrollbar'
        >
          <RadialSurface
            w='100%'
            // h={248}
            radius={3}
            css={{
              flexShrink: 0,
            }}
          >
            <NavigationList />
          </RadialSurface>
          <RadialSurface w='100%' radius={4}>
            {currentUser.role === UserRoleEnum.GeneralUser ? (
              <MyMembershipList />
            ) : (
              <MyMembersList />
            )}
          </RadialSurface>
          <RadialSurface w='100%' radius={4}>
            <WatchlistList />
          </RadialSurface>
        </VStack>
      </Box>
    </Box>
  );
}
Header.displayName = 'Header';

export default Header;
