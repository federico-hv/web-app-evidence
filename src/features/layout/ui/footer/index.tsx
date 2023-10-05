import { Box, HStack, NavigationLink } from '@holdr-ui/react';
import {
  Paths,
  prefix,
  Responsive,
  ResponsiveItem,
  useIsBottomOf,
  useScrollDirection,
  useScrollPosition,
} from '../../../../shared';
import { Link, matchPath, useLocation } from 'react-router-dom';

function Footer() {
  const { top } = useScrollPosition('#root');
  const isBottom = useIsBottomOf('#root');
  const { direction, delta } = useScrollDirection('#root');
  const { pathname } = useLocation();

  return (
    <Responsive>
      <ResponsiveItem mobile='show'>
        <Box
          display={
            top >= 15 && !isBottom && direction === 'down' && delta > 0
              ? 'none'
              : 'block'
          }
          borderTop={2}
          borderColor='base100'
          as='footer'
          position='fixed'
          b={0}
          l={0}
          zIndex={50}
          w='100%'
          p={3}
          css={{
            backgroundColor: '#fbfbfa',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px',
          }}
        >
          <HStack justify='space-between' as='nav' p={2}>
            <NavigationLink
              variant='ghost'
              as={<Link to={prefix('/', Paths.root)} />}
              isActive={!!matchPath('', pathname)}
              activeIcon='home-fill'
              size='sm'
              inactiveIcon='home-outline'
              css={{
                padding: 0,
                size: '2.5rem',
              }}
            />
            <NavigationLink
              variant='ghost'
              as={<Link to={prefix('/', Paths.bookmarks)} />}
              isActive={!!matchPath(Paths.bookmarks, pathname)}
              activeIcon='bookmark-fill'
              size='sm'
              inactiveIcon='bookmark-outline'
              css={{
                padding: 0,
                size: '2.5rem',
              }}
            />
            <NavigationLink
              variant='ghost'
              as={<Link to={prefix('/', Paths.releases)} />}
              isActive={!!matchPath(Paths.releases, pathname)}
              activeIcon='releases-fill'
              size='sm'
              inactiveIcon='releases-outline'
              css={{
                padding: 0,
                size: '2.5rem',
              }}
            />
            <NavigationLink
              variant='ghost'
              as={<Link to={prefix('/', Paths.discover)} />}
              isActive={!!matchPath(Paths.discover, pathname)}
              activeIcon='search-outline'
              size='sm'
              inactiveIcon='search-outline'
              css={{
                padding: 0,
                size: '2.5rem',
              }}
            />
          </HStack>
        </Box>
      </ResponsiveItem>
    </Responsive>
  );
}

Footer.displayName = 'Footer';

export { Footer };
