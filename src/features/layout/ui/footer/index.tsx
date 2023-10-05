import {
  Box,
  HStack,
  IconButton,
  NavigationLink,
  useDisclosure,
} from '@holdr-ui/react';
import {
  DialogTabContextProvider,
  Paths,
  prefix,
  Responsive,
  ResponsiveItem,
  useIsBottomOf,
  useScrollDirection,
  useScrollPosition,
} from '../../../../shared';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { css } from '../../../../configs';
import { CreatePostDialog } from '../../../feeds';
import { useState } from 'react';
import { useCurrentUser } from '../../../auth';

const largeIcon = css({
  fontSize: '1.25rem !important',
});

function Footer() {
  const currentUser = useCurrentUser();

  const { top } = useScrollPosition('#root');
  const isBottom = useIsBottomOf('#root');
  const { direction, delta } = useScrollDirection('#root');

  const { pathname } = useLocation();

  const [option, setOption] = useState('');
  const { isOpen, onOpen: open, onClose } = useDisclosure();

  const onOpen = (option: string) => {
    setOption(option);
    open();
  };

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
          <HStack justify='space-between' items='center' as='nav' p={2}>
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
              as={<Link to={prefix('/', Paths.messages)} />}
              isActive={!!matchPath(Paths.messages, pathname)}
              activeIcon='chat-alt-fill'
              size='sm'
              inactiveIcon='chat-alt-outline'
              css={{
                padding: 0,
                size: '2.5rem',
              }}
            />
            {currentUser && currentUser.role === 'artist' && (
              <DialogTabContextProvider
                value={{ isOpen, onOpen, option, onClose }}
              >
                <IconButton
                  size='lg'
                  onClick={() => onOpen('')}
                  className={largeIcon()}
                  icon={'add'}
                  ariaLabel={'create post'}
                />
                <CreatePostDialog />
              </DialogTabContextProvider>
            )}
            <NavigationLink
              variant='ghost'
              as={<Link to={prefix('/', Paths.notifications)} />}
              isActive={!!matchPath(Paths.notifications, pathname)}
              activeIcon='notification-alt-fill'
              size='sm'
              inactiveIcon='notification-alt-outline'
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
