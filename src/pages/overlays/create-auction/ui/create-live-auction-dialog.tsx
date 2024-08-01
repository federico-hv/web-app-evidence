import {
  Box,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  HStack,
  Heading,
  StackDivider,
  VStack,
  hexToRGB,
  useDisclosure,
} from '@holdr-ui/react';
import {
  GQLRenderer,
  Paths,
  makePath,
  LoadWithoutPreviousLocation,
} from '../../../../shared';
import {
  ClubContextConsumer,
  ClubProvider,
  PerksProvider,
  useSuspenseGetClub,
} from '../../../../features';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { SetupStep } from '../../setup-artist-profile';
import { Fragment } from 'react';

function CreateLiveAuctionDialog() {
  const disclosure = useDisclosure(true);

  const navigate = useNavigate();

  const location = useLocation();

  const { slug } = useParams();

  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  const onDialogClose = () =>
    navigate(makePath([Paths.clubs, slug ?? '']) || '/');

  if (!slug) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <LoadWithoutPreviousLocation default={`/clubs/${slug}/bio`} />
      <GQLRenderer>
        <ClubProvider>
          <Dialog {...disclosure} onClose={onDialogClose}>
            <DialogPortal>
              <DialogOverlay zIndex={15} />

              <DialogContent
                zIndex={20}
                className='setup-account'
                w={881}
                h={724}
                gap={0}
                overflowY='hidden'
                maxHeight='90vh'
                bgColor='#30304B'
                css={{
                  userSelect: 'none',
                }}
                divider={
                  <Box h={'1px'} bgColor={hexToRGB('#9898FF', 0.1)} />
                }
              >
                <DialogHeader py={7} px='48px'>
                  <Heading size={'36px'} weight={600}>
                    Start an auction
                  </Heading>
                </DialogHeader>
                <DialogBody
                  h='calc(100% - 92px)'
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
                    <VStack gap={6} mt={1} py='48px'>
                      <SetupStep
                        number={1}
                        description='Auction Details'
                        active={
                          currentPath === Paths.auctionDetails ||
                          currentPath === Paths.reviewAuctionInfo ||
                          currentPath === Paths.confirmAuction
                        }
                      />
                      <SetupStep
                        number={2}
                        description='Review Information'
                        active={
                          currentPath === Paths.reviewAuctionInfo ||
                          currentPath === Paths.confirmAuction
                        }
                      />
                      <SetupStep
                        number={3}
                        description='Confirm'
                        active={currentPath === Paths.confirmAuction}
                      />
                    </VStack>

                    <Box py={48} flex={1}>
                      <ClubContextConsumer>
                        {(club) => (
                          <PerksProvider clubId={club.id}>
                            <Outlet />
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

CreateLiveAuctionDialog.displayName = 'CreateLiveAuctionDialog';

export default CreateLiveAuctionDialog;
