import {
  Box,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  hexToRGB,
  HStack,
  StackDivider,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Fragment } from 'react';
import {
  GQLRenderer,
  LoadWithoutPreviousLocation,
  makePath,
  Paths,
} from '../../../../shared';
import ChangeAvatar from '../../edit-user-profile/ui/change-avatar';
import { SetupStep } from '../../setup-artist-profile';
import {
  ClubContextConsumer,
  ClubProvider,
  PerksProvider,
  useSuspenseGetArtist,
} from '../../../../features';

function EditArtistClubDialog() {
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({ slug });

  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  if (!slug) {
    return <Navigate to={makePath([Paths.clubs])} />;
  }

  return (
    <Fragment>
      <LoadWithoutPreviousLocation default={`/clubs/${slug}/bio`} />
      <GQLRenderer>
        <ClubProvider>
          <Dialog
            {...disclosure}
            onClose={() =>
              navigate(location.state?.previousLocation || '/')
            }
          >
            <DialogPortal>
              <DialogOverlay zIndex={15} />
              <DialogContent
                zIndex={20}
                className='setup-account'
                w={881}
                h={724}
                overflowY='hidden'
                maxHeight='90vh'
                bgColor='#30304B'
                css={{
                  userSelect: 'none',
                }}
              >
                <DialogBody
                  h='100%'
                  zIndex={50}
                  py={0}
                  px={48}
                  id='page-dialog-container'
                >
                  <HStack
                    h='100%'
                    css={{ gap: '48px' }}
                    divider={
                      <StackDivider
                        width={1}
                        color={hexToRGB('#9898FF', 0.1)}
                      />
                    }
                  >
                    <Box py={48}>
                      <ChangeAvatar
                        placeholder={artistData.artist.avatar}
                        name={artistData.artist.name}
                        variant='squircle'
                      />

                      <VStack gap={6} mt={9}>
                        <SetupStep
                          number={1}
                          path={makePath([
                            Paths.clubs,
                            slug,
                            Paths.edit,
                            'bio',
                          ])}
                          description='Bio'
                          active={currentPath === Paths.bio}
                        />
                        <SetupStep
                          number={2}
                          path={makePath([
                            Paths.clubs,
                            slug,
                            Paths.edit,
                            'music-and-links',
                          ])}
                          description='Music and Links'
                          active={currentPath === Paths.musicAndLinks}
                        />
                        <SetupStep
                          number={3}
                          path={makePath([
                            Paths.clubs,
                            slug,
                            Paths.edit,
                            'auction',
                          ])}
                          description='Auction Details'
                          active={currentPath === Paths.auction}
                        />
                      </VStack>
                    </Box>

                    <Box py={48} flex={1}>
                      <ClubContextConsumer>
                        {(club) => (
                          <PerksProvider clubId={club.id}>
                            <GQLRenderer>
                              <Outlet />
                            </GQLRenderer>
                          </PerksProvider>
                        )}
                      </ClubContextConsumer>
                    </Box>
                  </HStack>
                </DialogBody>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </ClubProvider>
      </GQLRenderer>
    </Fragment>
  );
}
EditArtistClubDialog.displayName = 'EditArtistClubDialog';

export default EditArtistClubDialog;
