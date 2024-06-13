import { Route, Routes } from 'react-router';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@holdr-ui/react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  QueryGuard,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  usePreviousLocation,
} from '../../shared';
import { FlatList } from '../../tmp/flat-list';
import { Fragment } from 'react';
import { LoadWithoutPreviousLocation } from './edit-general-user-profile.routes';
import { CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED } from '../../features';

function RelationshipsDialog() {
  const { username } = useParams();
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation('/');

  // go back to previous location if the user has account is protected or blocked

  if (!username) {
    return <Fragment />;
  }

  return (
    <QueryGuard
      query={CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED}
      args={{ username }}
      name='checkIsProfileBlockedOrProtected'
      fallback={<Navigate to={previousLocation} />}
    >
      <LoadWithoutPreviousLocation default={`/${username}/bio`} />
      <Dialog
        {...disclosure}
        onClose={() => navigate(location.state?.previousLocation || '/')}
      >
        <DialogPortal>
          <DialogOverlay blur={2} zIndex={20} />
          <DialogContent
            zIndex={20}
            radius={4}
            className='setup-account'
            minWidth={500}
            h={600}
            maxHeight='90vh'
            bgColor='rgba(64, 64, 102, 0.80)'
            overflow='auto'
            css={{
              backdropFilter: 'blur(12px)',
            }}
          >
            <DialogBody zIndex={50} px={6} py={6}>
              <RoutingTabs flex={1}>
                <RoutingTabsHeader
                  h='fit-content'
                  // items='center'
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <RoutingTabsList gap={1} maxHeight={60}>
                    <RoutingTabsTrigger
                      state={{ previousLocation }}
                      tabIndex={0}
                      w='fit-content'
                      pt={1}
                      pb={5}
                      px={3}
                      fontSize={6}
                      _inactive={{ color: '$white700', fontWeight: 400 }}
                      _active={{
                        color: '$white500',
                        borderBottom: '2px solid $purple500',
                        fontWeight: 500,
                      }}
                      _hover={{ background: '#9898FF26' }}
                      to='followers'
                    >
                      Followers
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      state={{ previousLocation }}
                      w='fit-content'
                      pt={1}
                      pb={5}
                      px={3}
                      fontSize={6}
                      _inactive={{ color: '$white700', fontWeight: 400 }}
                      _active={{
                        color: '$white500',
                        borderBottom: '2px solid $purple500',
                        fontWeight: 500,
                      }}
                      _hover={{ background: '#9898FF26' }}
                      to='following'
                    >
                      Following
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                  <IconButton
                    onClick={() => navigate(previousLocation)}
                    colorTheme='white500'
                    size='sm'
                    ariaLabel='close'
                    variant='outline'
                    icon='close'
                  />
                </RoutingTabsHeader>
                <RoutingTabsContent h='full' />
              </RoutingTabs>
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </QueryGuard>
  );
}

interface IFollowItem {
  id: string;
  avatar?: string;
  name: string;
  isVerified: boolean;
  relationship?: string;
}

function FollowItem({ data }: { data: IFollowItem }) {
  return (
    <HStack justify='space-between' items='center'>
      <HStack gap={2} items='center' justify='space-between'>
        <Avatar size={40} name={data.name} />
        <HStack gap={2} h='fit-content' items='center'>
          <Text weight={500}>{data.name}</Text>
          {data.isVerified && (
            <Box fontSize='18px' mt={1}>
              <Icon name='verified-outline' />
            </Box>
          )}
        </HStack>
      </HStack>
      {/* Show the current viewers relationship with the user*/}
      <Fragment>
        {data.relationship === 'following' ? (
          <Button
            variant='outline'
            css={{ padding: '5px 25px', height: 'fit-content' }}
            size='sm'
            colorTheme='purple50'
          >
            Following
          </Button>
        ) : (
          <Button
            css={{ padding: '5px 25px', height: 'fit-content' }}
            size='sm'
            colorTheme='purple100'
          >
            Follow
          </Button>
        )}
      </Fragment>
    </HStack>
  );
}

function FollowersList() {
  // Get the user's list of followers from the current user's perspective

  return (
    <FlatList
      pt={4}
      direction='vertical'
      gap={3}
      w='100%'
      data={[
        {
          id: '1',
          name: 'James Altman',
          isVerified: true,
        },
        {
          id: '2',
          name: 'Sarah Hoffman',
          isVerified: false,
        },
      ]}
      renderItem={(data) => <FollowItem data={data} />}
      keyExtractor={({ id }) => id}
    />
  );
}

function FollowingList() {
  // Get the user's list of followers from the current user's perspective

  return (
    <FlatList
      pt={4}
      direction='vertical'
      gap={3}
      w='100%'
      data={[
        {
          id: '4',
          avatar: '',
          name: 'Frank Dolt',
          isVerified: false,
        },
        {
          id: '41',
          avatar: '',
          name: 'Julia Cummings',
          isVerified: true,
          relationship: 'following',
        },
      ]}
      renderItem={(data) => <FollowItem data={data} />}
      keyExtractor={({ id }) => id}
    />
  );
}

const UserRelationshipsRoutes = () => (
  <Routes>
    <Route element={<RelationshipsDialog />}>
      <Route path='following' element={<FollowersList />} />
      <Route path='followers' element={<FollowingList />} />
    </Route>
  </Routes>
);

export default UserRelationshipsRoutes;
