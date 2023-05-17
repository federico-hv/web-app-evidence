import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  NavigationLink,
  NavigationLinkGroup,
  VStack,
} from '@holdr-ui/react';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';
import { extraBtnPadding } from './header-lg.styles';
function AuthenticatedNavigation() {
  const { pathname } = useLocation();
  return (
    <VStack w={375} h='full' justify='space-between'>
      <NavigationLinkGroup
        direction='vertical'
        variant='ghost'
        as='nav'
        gap={5}
        p={4}
      >
        <NavigationLink
          as={<Link to={prefix('/', Paths.home)} />}
          isActive={!!matchPath('', pathname)}
          text='Home'
          activeIcon='home-fill'
          inactiveIcon='home-outline'
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.discover)} />}
          isActive={!!matchPath('discover', pathname)}
          text='Discover'
          activeIcon='discover-fill'
          inactiveIcon='discover-outline'
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.channels)} />}
          isActive={!!matchPath('channels', pathname)}
          text='Channels'
          activeIcon='channels-fill'
          inactiveIcon='channels-outline'
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.bookmarks)} />}
          isActive={!!matchPath('bookmarks', pathname)}
          text='Bookmarks'
          activeIcon='bookmark-fill'
          inactiveIcon='bookmark-outline'
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.releases)} />}
          isActive={!!matchPath('releases', pathname)}
          text='Releases'
          activeIcon='releases-fill'
          inactiveIcon='releases-outline'
        />
      </NavigationLinkGroup>
      <Box p={4} borderTop={2} borderBottom={2} borderColor='base100'>
        <Button
          className={extraBtnPadding()}
          label='Holdr Club'
          fullWidth
          colorTheme='secondary400'
        />
      </Box>
      <Box h={320} p={4} w='full'>
        <Box bgColor='base100' w='full' h='full'></Box>
      </Box>
    </VStack>
  );
}
function UnauthenticatedNavigation() {
  const { pathname } = useLocation();
  return (
    <VStack w={375} h='full' justify='evenly'>
      <NavigationLinkGroup
        direction='vertical'
        variant='ghost'
        as='nav'
        gap={5}
        p={4}
        flex={1}
      >
        <NavigationLink
          as={<Link to={prefix('/', Paths.home)} />}
          isActive={!!matchPath('', pathname)}
          text='Feeds'
          activeIcon='home-fill'
          inactiveIcon='home-outline'
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.discover)} />}
          isActive={!!matchPath('discover', pathname)}
          text='Discover'
          activeIcon='discover-fill'
          inactiveIcon='discover-outline'
        />
      </NavigationLinkGroup>
      <Box p={4} borderTop={2} borderBottom={2} borderColor='base100'>
        <Button
          className={extraBtnPadding()}
          label='Holdr Club'
          fullWidth
          colorTheme='secondary400'
        />
      </Box>
      <Box flex={1} h={320} p={4} w='full'>
        <Box bgColor='base100' w='full' h='full'></Box>
      </Box>
    </VStack>
  );
}

UnauthenticatedNavigation.displayName = 'UnauthenticatedNavigation';
AuthenticatedNavigation.displayName = 'AuthenticatedNavigation';

export { UnauthenticatedNavigation, AuthenticatedNavigation };
