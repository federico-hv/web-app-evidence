import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  AlertContent,
  AlertDescription,
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
  CustomSkeleton,
  Loader,
  LoadWithoutPreviousLocation,
  usePreviousLocation,
} from '../../../../shared';
import { Fragment } from 'react';
import { ProfileProvider } from '../../../user-profile';
import { FlatList } from '../../../../tmp/flat-list';
import {
  IProfile,
  AuctionCard,
  useCurrentUser,
  useUserMembershipsQuery,
  MembershipCard,
} from '../../../../features';

// TODO: fix - not snapping on scroll

function UserMembershipsPage() {
  const currentUser = useCurrentUser();
  const { username } = useParams();
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation('/');

  const { data, loading, error } = useUserMembershipsQuery(username || '');

  if (!username) {
    return <Fragment />;
  }

  if (error) {
    return (
      <Box
        mt={5}
        py={4}
        borderTop={1}
        borderColor='rgba(152, 152, 255, 0.1)'
      >
        <Alert variant='solid' status='danger'>
          <AlertContent>
            <AlertDescription>
              Failed to load your memberships
            </AlertDescription>
          </AlertContent>
        </Alert>
      </Box>
    );
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

                <Box h='557px'>
                  <Loader
                    loading={loading}
                    as={<CustomSkeleton radius={3} />}
                  >
                    {data && (
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
                          scrollSnapPointsY: '500px',
                          scrollSnapType: 'y mandatory',
                        }}
                        data={data.userMemberships.edges}
                        renderItem={(item) => (
                          <Box h='500px'>
                            <MembershipCard
                              data={{
                                id: item.node.club.id,
                                name: `${item.node.club.name}'s club`,
                                coverImage: item.node.club.coverImage,
                                perks: item.node.perks.map(
                                  ({ label }) => label,
                                ),
                              }}
                            />
                          </Box>
                        )}
                        keyExtractor={(item) => item.node.id}
                      />
                    )}
                  </Loader>
                </Box>
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
