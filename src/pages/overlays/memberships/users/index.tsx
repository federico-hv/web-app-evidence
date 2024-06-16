import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
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
  Asset,
  LoadWithoutPreviousLocation,
  usePreviousLocation,
} from '../../../../shared';
import { Fragment } from 'react';
import { ProfileProvider } from '../../../user-profile';
import { FlatList } from '../../../../tmp/flat-list';
import {
  IProfile,
  MembershipCard,
  useCurrentUser,
} from '../../../../features';
import { dummyPerks } from '../../../clubs/shared';

function UserMembershipsPage() {
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

                <FlatList
                  className='thin-scrollbar'
                  pt='18px'
                  direction='vertical'
                  gap={3}
                  w='100%'
                  overflowY='auto'
                  h='557px'
                  css={{
                    paddingInlineEnd: '$3',
                    scrollSnapPointsY: '600px',
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
                    <Box h={500}>
                      <MembershipCard
                        data={{
                          name: 'Thomas Selas Club',
                          coverImage: Asset.Image.DummyMembershipCover,
                          slug: '',
                          perks: dummyPerks,
                        }}
                      />
                    </Box>
                  )}
                  keyExtractor={({ id }) => id}
                />
              </ProfileProvider>
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Fragment>
  );
}
UserMembershipsPage.displayName = 'UserMembershipsPage';

export default UserMembershipsPage;
