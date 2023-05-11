import {
  Box,
  Button,
  HStack,
  Image,
  NavigationLink,
  NavigationLinkGroup,
  VStack,
} from '@holdr-ui/react';
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom';
import { Paths } from 'shared';

import logoDark from 'assets/images/logo-dark.png';
import { prefix } from '../../utilities';
import { css } from '../../configs';

const extraBtnPadding = css({
  py: '10px',
  height: '3rem !important',
});

function MainLayout() {
  const { pathname } = useLocation();
  return (
    <Box>
      <HStack
        as='nav'
        items='center'
        px={5}
        py={4}
        borderBottom={1}
        borderColor='base100'
        boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
      >
        <Image size={30} src={logoDark} />
      </HStack>
      <HStack h='calc(100vh - 63px)' position='relative'>
        <VStack
          as='header'
          maxWidth={350}
          w='full'
          borderRight={1}
          borderColor='base100'
          h='full'
        >
          <VStack h='full' justify='space-between'>
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
            <Box
              p={4}
              borderTop={1}
              borderBottom={1}
              borderColor='base100'
            >
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
        </VStack>
        <Box as='main' p={4}>
          <Outlet />
        </Box>
      </HStack>
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;
