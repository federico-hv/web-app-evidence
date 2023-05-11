import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  NavigationLink,
  NavigationLinkGroup,
  VStack,
} from '@holdr-ui/react';
import { prefix } from 'utilities';
import { Paths } from 'shared';

function HeaderMd() {
  const { pathname } = useLocation();
  return (
    <VStack
      as='header'
      w={75}
      borderRight={2}
      borderColor='base100'
      h='full'
      css={{
        '@bp1': {
          display: 'none',
        },
        '@bp3': {
          display: 'flex',
        },
        '@bp7': {
          display: 'none',
        },
      }}
    >
      <VStack w={75} h='full' justify='space-between' items='center'>
        <NavigationLinkGroup
          direction='vertical'
          variant='ghost'
          as='nav'
          gap={4}
          p={4}
        >
          <NavigationLink
            as={<Link to={prefix('/', Paths.home)} />}
            isActive={!!matchPath('', pathname)}
            activeIcon='home-fill'
            inactiveIcon='home-outline'
            css={{
              padding: 0,
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.discover)} />}
            isActive={!!matchPath('discover', pathname)}
            activeIcon='discover-fill'
            inactiveIcon='discover-outline'
            css={{
              padding: 0,
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.channels)} />}
            isActive={!!matchPath('channels', pathname)}
            activeIcon='channels-fill'
            inactiveIcon='channels-outline'
            css={{
              padding: 0,
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.bookmarks)} />}
            isActive={!!matchPath('bookmarks', pathname)}
            activeIcon='bookmark-fill'
            inactiveIcon='bookmark-outline'
            css={{
              padding: 0,
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.releases)} />}
            isActive={!!matchPath('releases', pathname)}
            activeIcon='releases-fill'
            inactiveIcon='releases-outline'
            css={{
              padding: 0,
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
        <Box h={320} p={4} w='full'>
          <Box bgColor='base100' w='full' h='full'></Box>
        </Box>
      </VStack>
    </VStack>
  );
}
HeaderMd.displayName = 'HeaderMd';

export default HeaderMd;
