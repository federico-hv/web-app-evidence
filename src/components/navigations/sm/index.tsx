import { NavigationLink, NavigationLinkGroup } from '@holdr-ui/react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';

function NavigationSm() {
  const { pathname } = useLocation();

  return (
    <NavigationLinkGroup
      variant='ghost'
      position='fixed'
      size='lg'
      b={0}
      py={4}
      px={3}
      w='w-screen'
      justify='space-between'
      borderColor='base100'
      borderTop={2}
      css={{
        '@bp3': { display: 'none' },
      }}
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
NavigationSm.displayName = 'NavigationSm';

export default NavigationSm;
