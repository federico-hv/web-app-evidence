import {
  Box,
  IconButton,
  NavigationLink,
  NavigationLinkGroup,
} from '@holdr-ui/react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';

function AuthenticatedNavigationMd() {
  const { pathname } = useLocation();
  return (
    <>
      <NavigationLinkGroup
        direction='vertical'
        variant='ghost'
        as='nav'
        gap={6}
        p={4}
      >
        <NavigationLink
          as={<Link to={prefix('/', Paths.home)} />}
          isActive={!!matchPath('', pathname)}
          activeIcon='home-fill'
          inactiveIcon='home-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.discover)} />}
          isActive={!!matchPath('discover', pathname)}
          activeIcon='discover-fill'
          inactiveIcon='discover-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.channels)} />}
          isActive={!!matchPath('channels', pathname)}
          activeIcon='channels-fill'
          inactiveIcon='channels-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.bookmarks)} />}
          isActive={!!matchPath('bookmarks', pathname)}
          activeIcon='bookmark-fill'
          inactiveIcon='bookmark-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.releases)} />}
          isActive={!!matchPath('releases', pathname)}
          activeIcon='releases-fill'
          inactiveIcon='releases-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
      </NavigationLinkGroup>
      <Box p={4} borderTop={2} borderBottom={2} borderColor='base100'>
        <IconButton
          icon='store-fill'
          ariaLabel='go to shop'
          colorTheme='secondary400'
        />
      </Box>
      <Box h={320} minHeight={320} p={4} w='full'>
        <Box bgColor='base100' w='full' h='full'></Box>
      </Box>
    </>
  );
}

function UnauthenticatedNavigationMd() {
  const { pathname } = useLocation();
  return (
    <>
      <NavigationLinkGroup
        direction='vertical'
        variant='ghost'
        as='nav'
        gap={6}
        p={4}
      >
        <NavigationLink
          as={<Link to={prefix('/', Paths.home)} />}
          isActive={!!matchPath('', pathname)}
          activeIcon='home-fill'
          inactiveIcon='home-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
        <NavigationLink
          as={<Link to={prefix('/', Paths.discover)} />}
          isActive={!!matchPath('discover', pathname)}
          activeIcon='discover-fill'
          inactiveIcon='discover-outline'
          css={{
            padding: 0,
            size: '2.5rem',
          }}
        />
      </NavigationLinkGroup>
      <Box p={4} borderTop={2} borderBottom={2} borderColor='base100'>
        <IconButton
          icon='store-fill'
          ariaLabel='go to shop'
          colorTheme='secondary400'
        />
      </Box>
      <Box h={320} minHeight={320} p={4} w='full'>
        <Box bgColor='base100' w='full' h='full'></Box>
      </Box>
    </>
  );
}
UnauthenticatedNavigationMd.displayName = 'UnauthenticatedNavigationMd';
AuthenticatedNavigationMd.displayName = 'AuthenticatedNavigationMd';

export { UnauthenticatedNavigationMd, AuthenticatedNavigationMd };
