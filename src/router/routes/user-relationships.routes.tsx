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
  LinkOverlay,
  Loader,
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
import {
  CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED,
  SocialButton,
  useGetFollowers,
  useGetFollowing,
  UserWithRelationship,
} from '../../features';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;

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

function FollowItem({ data }: { data: UserWithRelationship }) {
  return (
    <HStack justify='space-between' items='center' position='relative'>
      <LinkOverlay
        to={`${data.role === 'artist' ? '/clubs' : ''}/${data.username}`}
      />
      <HStack gap={2} items='center' justify='space-between'>
        <Avatar size={40} name={data.avatar} />
        <HStack gap={2} h='fit-content' items='center'>
          <Text weight={500} style={{ marginBottom: '5px' }}>
            {data.displayName}
          </Text>
          {/*{data.isVerified && (*/}
          {/*  <Box fontSize='18px' mt={1}>*/}
          {/*    <Icon name='verified-outline' />*/}
          {/*  </Box>*/}
          {/*)}*/}
        </HStack>
      </HStack>
      {/* Show the current viewers relationship with the user*/}
      <Box zIndex={5}>
        <SocialButton
          username={data.username}
          statusInfo={data.relationshipStatusInfo}
        />
      </Box>
    </HStack>
  );
}

function FollowersList() {
  const { username } = useParams();

  const { loading, error, data } = useGetFollowers(username || '');

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <FlatList
          pt={4}
          direction='vertical'
          gap={3}
          w='100%'
          data={data.followers.edges}
          renderItem={(data) => <FollowItem data={data.node} />}
          keyExtractor={({ node }) => node.id}
        />
      )}
    </Loader>
  );
}

function FollowingList() {
  const { username } = useParams();

  const { loading, error, data } = useGetFollowing(username || '');

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <FlatList
          pt={4}
          direction='vertical'
          gap={3}
          w='100%'
          data={data.following.edges}
          renderItem={(data) => <FollowItem data={data.node} />}
          keyExtractor={({ node }) => node.id}
        />
      )}
    </Loader>
  );
}

const UserRelationshipsRoutes = () => (
  <Routes>
    <Route element={<RelationshipsDialog />}>
      <Route path='followers' element={<FollowersList />} />
      <Route path='following' element={<FollowingList />} />
    </Route>
  </Routes>
);

export default UserRelationshipsRoutes;
