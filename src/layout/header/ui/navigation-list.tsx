import { matchPath, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Icon,
  Text,
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  Button,
  ButtonGroup,
} from '@holdr-ui/react';
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
  state?: any;
}

function NavigationItem({
  label,
  icon,
  active,
  to,
  state,
}: NavigationItemProps) {
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
      <LinkOverlay to={to} state={state} />
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

function CreateActionButton() {
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();

  return (
    <Popover>
      <PopoverTrigger w='100%'>
        <Box
          w='100%'
          radius={2}
          position='relative'
          h={48}
          _hover={{ backgroundColor: '#9898FF26' }}
        >
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
              <Icon name='add-circle-outline' />
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
                  Create
                </Text>
              </ResponsiveItem>
            </Responsive>
          </HStack>
        </Box>
        <PopoverPortal>
          <PopoverContent
            border={1}
            borderColor='rgba(152, 152, 255, 0.1)'
            w={275}
            minWidth={1}
            side='top'
            sideOffset={-50}
            radius={1}
            bgColor='rgb(51, 49, 79)'
          >
            <VStack gap={2}>
              <HStack cursor='pointer' px={3} py={3} radius={2} w='100%'>
                <LinkOverlay
                  to={makePath([Paths.create, 'post'])}
                  state={{ previousLocation: pathname }}
                />
                Create Post
              </HStack>
              <HStack cursor='pointer' px={3} py={3} radius={2} w='100%'>
                <LinkOverlay
                  to={makePath([
                    Paths.clubs,
                    currentUser.username,
                    Paths.auction,
                    Paths.create,
                  ])}
                  state={{ previousLocation: pathname }}
                />
                Create Auction
              </HStack>
            </VStack>
          </PopoverContent>
        </PopoverPortal>
      </PopoverTrigger>
    </Popover>
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
      {/*<CreateActionButton />*/}
    </VStack>
  );
}
NavigationList.displayName = 'NavigationList';

export default NavigationList;
