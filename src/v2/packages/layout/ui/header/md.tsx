import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Box,
  IconButton,
  NavigationLink,
  NavigationLinkGroup,
  VStack,
} from '@holdr-ui/react';
import { Paths, prefix } from '../../../common';

function MdHeader() {
  const { pathname } = useLocation();
  return (
    <VStack as='header' w={75} h='full'>
      <VStack
        position='fixed'
        t={65}
        w={75}
        h='calc(100% - 65px)'
        justify='space-between'
        items='center'
      >
        <VStack h='100%' justify='space-between' overflowY='scroll'>
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
        </VStack>
      </VStack>
    </VStack>
  );
}
MdHeader.displayName = 'MdHeader';

export default MdHeader;
