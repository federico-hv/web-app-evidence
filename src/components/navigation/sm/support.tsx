import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Button,
  HStack,
  NavigationLink,
  NavigationLinkGroup,
  Text,
} from '@holdr-ui/react';
import { prefix } from 'utilities';
import { Paths } from 'shared';

function AuthenticatedNavigationSm() {
  const { pathname } = useLocation();
  return (
    <NavigationLinkGroup
      variant='ghost'
      size='lg'
      p={3}
      w='w-screen'
      justify='space-between'
    >
      <NavigationLink
        as={<Link to={prefix('/', Paths.home)} />}
        isActive={!!matchPath('', pathname)}
        activeIcon='home-fill'
        inactiveIcon='home-outline'
        css={{ padding: 0 }}
      />
      <NavigationLink
        as={<Link to={prefix('/', Paths.discover)} />}
        isActive={!!matchPath('discover', pathname)}
        activeIcon='discover-fill'
        inactiveIcon='discover-outline'
        css={{ padding: 0 }}
      />
      <NavigationLink
        as={<Link to={prefix('/', Paths.channels)} />}
        isActive={!!matchPath('channels', pathname)}
        activeIcon='channels-fill'
        inactiveIcon='channels-outline'
        css={{ padding: 0 }}
      />
      <NavigationLink
        as={<Link to={prefix('/', Paths.bookmarks)} />}
        isActive={!!matchPath('bookmarks', pathname)}
        activeIcon='bookmark-fill'
        inactiveIcon='bookmark-outline'
        css={{ padding: 0 }}
      />
      <NavigationLink
        as={<Link to={prefix('/', Paths.releases)} />}
        isActive={!!matchPath('releases', pathname)}
        activeIcon='releases-fill'
        inactiveIcon='releases-outline'
        css={{ padding: 0 }}
      />
    </NavigationLinkGroup>
  );
}

function UnauthenticatedNavigationSm() {
  return (
    <HStack items='center' w='100%' px={3} py={4} justify='space-between'>
      <Text size={2}>Log in or join for full experience.</Text>
      <a
        href={`${import.meta.env.VITE_AUTH_APP_URL}?redirect_url=${
          import.meta.env.VITE_APP_BASE_URL
        }${import.meta.env.VITE_APP_BASE_PATH}`}
      >
        <Button label='Continue' />
      </a>
    </HStack>
  );
}

AuthenticatedNavigationSm.displayName = 'AuthenticatedNavigationSm';
UnauthenticatedNavigationSm.displayName = 'UnauthenticatedNavigationSm';

export { AuthenticatedNavigationSm, UnauthenticatedNavigationSm };
