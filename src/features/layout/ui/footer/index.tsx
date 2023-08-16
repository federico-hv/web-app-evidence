import { Box, NavigationLink, NavigationLinkGroup } from '@holdr-ui/react';
import {
  Paths,
  prefix,
  Responsive,
  ResponsiveItem,
} from '../../../../shared';
import { Link, matchPath, useLocation } from 'react-router-dom';

function Footer() {
  const { pathname } = useLocation();
  return (
    <Responsive>
      <ResponsiveItem mobile='show'>
        <Box
          as='footer'
          position='fixed'
          b={0}
          l={0}
          w='100%'
          p={3}
          css={{
            backgroundColor: '#fbfbfa',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px',
          }}
        >
          <NavigationLinkGroup
            direction='horizontal'
            justify='space-between'
            variant='ghost'
            as='nav'
            p={2}
          >
            <NavigationLink
              as={<Link to={prefix('/', Paths.home)} />}
              isActive={!!matchPath('', pathname)}
              activeIcon='home-fill'
              size='sm'
              inactiveIcon='home-outline'
              css={{
                padding: 0,
                size: '2rem',
              }}
            />
            <NavigationLink
              as={<Link to={prefix('/', Paths.bookmarks)} />}
              isActive={!!matchPath(Paths.bookmarks, pathname)}
              activeIcon='bookmark-fill'
              size='sm'
              inactiveIcon='bookmark-outline'
              css={{
                padding: 0,
                size: '2rem',
              }}
            />
            <NavigationLink
              as={<Link to={prefix('/', Paths.releases)} />}
              isActive={!!matchPath(Paths.releases, pathname)}
              activeIcon='releases-fill'
              size='sm'
              inactiveIcon='releases-outline'
              css={{
                padding: 0,
                size: '2rem',
              }}
            />
            <NavigationLink
              as={<Link to={prefix('/', Paths.discover)} />}
              isActive={!!matchPath(Paths.discover, pathname)}
              activeIcon='discover-fill'
              size='sm'
              inactiveIcon='discover-outline'
              css={{
                padding: 0,
                size: '2rem',
              }}
            />
          </NavigationLinkGroup>
        </Box>
      </ResponsiveItem>
    </Responsive>
  );
}

Footer.displayName = 'Footer';

export { Footer };
