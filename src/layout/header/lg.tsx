import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  NavigationLink,
  NavigationLinkGroup,
  VStack,
} from '@holdr-ui/react';
import { extraBtnPadding, Paths, prefix } from '../../../../shared';
import { Calendar } from '../../../../shared/components';

function LgHeader() {
  const { pathname } = useLocation();

  return (
    <VStack
      as='header'
      w={375}
      minWidth={375}
      h='full'
      css={{
        '@bp1': { display: 'none' },
        '@bp7': { display: 'flex' },
      }}
    >
      <VStack
        position='fixed'
        t={65}
        w={375}
        h='calc(100% - 65px)'
        justify='space-between'
      >
        <NavigationLinkGroup
          direction='vertical'
          variant='ghost'
          as='nav'
          gap={5}
          p={4}
        >
          <NavigationLink
            as={<Link to={prefix('/', Paths.root)} />}
            isActive={!!matchPath('', pathname)}
            text='Home'
            activeIcon='home-fill'
            inactiveIcon='home-outline'
            css={{
              height: '2.5rem',
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.discover)} />}
            isActive={!!matchPath('discover/*', pathname)}
            text='Discover'
            activeIcon='search-outline'
            inactiveIcon='search-outline'
            css={{
              height: '2.5rem',
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.channels)} />}
            isActive={!!matchPath('channels/*', pathname)}
            text='Channels'
            activeIcon='channels-fill'
            inactiveIcon='channels-outline'
            css={{
              height: '2.5rem',
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.allBookmarks)} />}
            isActive={!!matchPath('bookmarks/*', pathname)}
            text='Bookmarks'
            activeIcon='bookmark-fill'
            inactiveIcon='bookmark-outline'
            css={{
              height: '2.5rem',
            }}
          />
          <NavigationLink
            as={<Link to={prefix('/', Paths.releases)} />}
            isActive={!!matchPath('releases/*', pathname)}
            text='Releases'
            activeIcon='releases-fill'
            inactiveIcon='releases-outline'
            css={{
              height: '2.5rem',
            }}
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
        <Box h={350} minHeight={320} p={4} w='full'>
          <Box w='full' h='full'>
            <Calendar onDateClick={(date: Date) => console.log(date)} />
          </Box>
        </Box>
      </VStack>
    </VStack>
  );
}
LgHeader.displayName = 'LgHeader';

export default LgHeader;
