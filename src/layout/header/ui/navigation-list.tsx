import { matchPath, useLocation } from 'react-router-dom';
import { Box, VStack, HStack, Icon, Text } from '@holdr-ui/react';
import {
  LinkOverlay,
  makePath,
  Responsive,
  ResponsiveItem,
  Paths,
  prefix,
} from '../../../shared';
import { useCurrentUser } from '../../../features';
import { Fragment } from 'react';
import { IconName } from '@holdr-ui/react/dist/shared/types';

interface NavigationItemProps {
  label: string;
  icon: { active: IconName; inactive: IconName };
  active: boolean;
  to: string;
}

function NavigationItem({ label, icon, active, to }: NavigationItemProps) {
  return (
    <Box
      radius={2}
      position='relative'
      h={48}
      _hover={{ backgroundColor: '#9898FF26' }}
      css={{
        background: active ? '#9898FF26' : 'transparent',
      }}
    >
      <LinkOverlay to={to} />
      <HStack
        items='center'
        justify={{ '@bp1': 'center', '@bp7': 'flex-start' }}
        w='100%'
        h='100%'
        gap={3}
        px={4}
        _hover={{ background: '#9898FF26' }}
      >
        <Box css={{ fontSize: '24px', marginTop: '5px' }}>
          <Icon name={active ? icon.active : icon.inactive} />
        </Box>
        <Responsive>
          <ResponsiveItem desktop='show'>
            <Text
              casing='capitalize'
              css={{
                leadingTrim: 'both',
                textEdge: 'cap',
              }}
            >
              {label}
            </Text>
          </ResponsiveItem>
        </Responsive>
      </HStack>
    </Box>
  );
}

function NavigationList() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Fragment />;
  }

  return (
    <VStack as='nav' p={4} gap={2}>
      <NavigationItem
        active={!!matchPath(Paths.root, pathname)}
        label='Home'
        to={Paths.root}
        icon={{ active: 'home-fill', inactive: 'home-outline' }}
      />
      <NavigationItem
        active={
          !!matchPath(makePath([currentUser.username, '/*']), pathname) ||
          !!matchPath(
            makePath(['artist', currentUser.username, '/*']),
            pathname,
          )
        }
        label='Profile'
        to={
          currentUser.role === 'artist'
            ? `/artist/${currentUser.username}`
            : `${currentUser.username}/bio`
        }
        icon={{
          active: 'user-circle-fill',
          inactive: 'user-circle-outline',
        }}
      />
      <NavigationItem
        active={!!matchPath(makePath([Paths.clubs, '/*']), pathname)}
        label='Clubs'
        to={makePath([Paths.clubs, 'all'])}
        icon={{
          active: 'collections-fill',
          inactive: 'collections-outline',
        }}
      />
      <NavigationItem
        active={!!matchPath(makePath([Paths.bookmarks, '/*']), pathname)}
        label='Bookmarks'
        to={makePath([Paths.bookmarks, 'all'])}
        icon={{
          active: 'bookmark-fill',
          inactive: 'bookmark-outline',
        }}
      />
    </VStack>
  );
}
NavigationList.displayName = 'NavigationList';

export default NavigationList;
