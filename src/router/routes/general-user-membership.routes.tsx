import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  GeneralContextConsumer,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
} from '@holdr-ui/react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { usePreviousLocation } from '../../shared';
import { FlatList } from '../../tmp/flat-list';
import { Route, Routes } from 'react-router';
import { ProfileProvider } from '../../pages/profile/shared';
import { IProfile, MembershipCard, useCurrentUser } from '../../features';
import membershipCover from '../../assets/dummy/membership-1.jpg';
import { LoadWithoutPreviousLocation } from './edit-general-user-profile.routes';
import { Fragment } from 'react';

function MembershipRouteDialog() {
  const currentUser = useCurrentUser();
  const { username } = useParams();
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation('/');

  if (!username) {
    return <Fragment />;
  }

  return (
    <Fragment>
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
            minWidth={480}
            h={660}
            maxHeight='90vh'
            bgColor='rgba(64, 64, 102, 0.80)'
            overflow='auto'
            css={{
              backdropFilter: 'blur(12px)',
            }}
          >
            <DialogBody overflowY='hidden' zIndex={50} px={6} py={6}>
              <ProfileProvider>
                <HStack
                  pb='18px'
                  items='center'
                  justify='space-between'
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <GeneralContextConsumer>
                    {({ state: profile }: { state: IProfile }) => (
                      <Heading size={6} weight={500}>
                        {currentUser.username === profile.username
                          ? 'My'
                          : `${profile.displayName}'s`}{' '}
                        Memberships
                      </Heading>
                    )}
                  </GeneralContextConsumer>
                  <IconButton
                    onClick={() => navigate(previousLocation)}
                    colorTheme='white500'
                    size='sm'
                    ariaLabel='close'
                    variant='outline'
                    icon='close'
                  />
                </HStack>

                <Outlet />
              </ProfileProvider>
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Fragment>
  );
}

function GeneralUserMembershipPage() {
  return (
    <FlatList
      className='thin-scrollbar'
      pt='18px'
      direction='vertical'
      gap={3}
      w='100%'
      overflowY='auto'
      h='557px'
      css={{
        scrollSnapPointsY: '557px',
        scrollSnapType: 'y mandatory',
      }}
      data={[
        {
          id: '4',
          name: 'Polony',
        },
        {
          id: '41',
          name: 'Bread',
        },
      ]}
      renderItem={(data) => (
        <MembershipCard
          css={{ scrollSnapAlign: 'start' }}
          w={398}
          h='100%'
          shrink={0}
          data={{
            name: 'Thomas Selas Club',
            coverImage: membershipCover,
            artist: {
              role: 'artist',
              username: 'thomasselas',
              displayName: 'Thomas Selas',
              id: 'id',
              avatar: '',
            },
          }}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
}

const GeneralUserMembershipRoutes = () => (
  <Routes>
    <Route element={<MembershipRouteDialog />}>
      <Route path='' element={<GeneralUserMembershipPage />} />
    </Route>
  </Routes>
);

export default GeneralUserMembershipRoutes;
