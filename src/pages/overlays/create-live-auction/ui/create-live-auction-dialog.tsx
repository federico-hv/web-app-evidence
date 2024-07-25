import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  HStack,
  Heading,
  Overlay,
  StackDivider,
  VStack,
  hexToRGB,
  useDisclosure,
  Text,
} from '@holdr-ui/react';
import {
  GQLRenderer,
  InputTextField,
  MaxFieldLength,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  TextareaField,
  makePath,
} from '../../../../shared';
import {
  ClubContextConsumer,
  ClubProvider,
  IClub,
  PerksProvider,
  useClubContext,
  useCurrentUser,
  useSuspenseGetClub,
} from '../../../../features';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { SetupStep } from '../../setup-artist-profile';
import { Fragment, useEffect, useState } from 'react';
import {
  LiveAuction,
  useCreateLiveAuction,
} from '../../../../features/auction/shared/hooks/use-create-live-auction';
import { useFormik } from 'formik';
import { number, object } from 'yup';

export interface OutletContext {
  formik: any;
  acceptButtonText: string;
  missingItems: boolean;
  setMissingItems: (value: boolean) => void;
  onDialogClose: () => void;
  onNextStep: () => void;
}

const validationSchema = object({
  duration: number().required('Required'),
  entryPrice: number()
    .required('Required')
    .max(999999999, 'Must 10 digits maximum')
    .positive('Value must be greater than 0'),
  numberOfMemberships: number()
    .required('Required')
    .max(999999999, 'Must 10 digits maximum')
    .positive('Value must be greater than 0')
    .integer('Must be an integer'),
});

function CreateLiveAuctionDialog() {
  //   return <Overlay bgColor='danger100' zIndex={15} />;
  const currentUser = useCurrentUser();

  const {
    data: { club },
  } = useSuspenseGetClub({
    accountId: currentUser.id,
  });

  // const { data, error } = useSuspenseGetClub({ slug: '' });
  const { auctionCreated, onSubmit: createLiveAuction } =
    useCreateLiveAuction();

  const [missingItems, setMissingItems] = useState(true);

  const formik = useFormik({
    initialValues: {
      duration: '',
      entryPrice: '',
      numberOfMemberships: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const liveAuctionValues: LiveAuction = {
        clubId: club.id,
        duration: Number(values.duration),
        entryPrice: Number(values.entryPrice),
        numberOfMemberships: Number(values.numberOfMemberships),
      };
      createLiveAuction(liveAuctionValues);
    },
  });

  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);

  const isAuctionDetails = location.pathname.includes('auction-details');
  const isReviewInformation = location.pathname.includes('review-auction');
  const isConfirmAuction = location.pathname.includes('confirm-auction');
  const acceptButtonText = isConfirmAuction
    ? 'Create Auction'
    : 'Continue';

  const { slug } = useParams();

  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  if (!slug) {
    return <Fragment />;
  }

  useEffect(() => {
    if (isAuctionDetails && step != 0) {
      setStep(0);
    } else if (isReviewInformation && step != 1) {
      setStep(1);
    } else if (isConfirmAuction && step != 2) {
      setStep(2);
    }
  }, [isAuctionDetails, isReviewInformation, isConfirmAuction]);

  useEffect(() => {
    if (auctionCreated) {
      onDialogClose();
    }
  }, [auctionCreated]);

  const steps = [
    Paths.auctionDetails,
    Paths.reviewAuctionInfo,
    Paths.confirmAuction,
  ];

  const getPath = (newPath: string) =>
    makePath([Paths.clubs, slug, Paths.auction, Paths.create, newPath]);

  const auctionDetailsPath = getPath(Paths.auctionDetails);

  const reviewInformationPath = getPath(Paths.reviewAuctionInfo);

  const confirmAuctionPath = getPath(Paths.confirmAuction);

  const onDialogClose = () =>
    navigate(location.state?.previousLocation || '/');

  const onNextStep = () => {
    if (isConfirmAuction) {
      setStep(0);
    } else {
      const nextStep = step + 1;
      setStep(nextStep);
      const newPath = steps[nextStep];
      const path = getPath(newPath);
      navigate(path);
    }
  };

  return (
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
              <DialogHeader py='36px' px='48px'>
                <Heading size={'36px'} weight={600}>
                  Create new auction
                </Heading>
              </DialogHeader>
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
                  <Box basis={182}>
                    <VStack gap={6} mt={1}>
                      <SetupStep
                        number={1}
                        path={auctionDetailsPath}
                        description='Auction Details'
                        active={
                          currentPath === Paths.auctionDetails ||
                          currentPath === Paths.reviewAuctionInfo ||
                          currentPath === Paths.confirmAuction
                        }
                      />
                      <SetupStep
                        number={2}
                        path={reviewInformationPath}
                        description='Review Information'
                        disabledLink={missingItems}
                        active={
                          missingItems
                            ? false
                            : currentPath === Paths.reviewAuctionInfo ||
                              currentPath === Paths.confirmAuction
                        }
                      />
                      <SetupStep
                        number={3}
                        path={confirmAuctionPath}
                        description='Confirm'
                        disabledLink={missingItems}
                        active={
                          missingItems
                            ? false
                            : currentPath === Paths.confirmAuction
                        }
                      />
                    </VStack>
                  </Box>

                  <Box pb={48} flex={1}>
                    <ClubContextConsumer>
                      {(club) => (
                        <PerksProvider clubId={club.id}>
                          <Outlet
                            context={{
                              formik,
                              missingItems,
                              setMissingItems,
                              onDialogClose,
                              onNextStep,
                              acceptButtonText,
                            }}
                          />
                        </PerksProvider>
                      )}
                    </ClubContextConsumer>
                  </Box>
                </HStack>
              </DialogBody>
              {/* <DialogFooter px={'48px'} py={'36px'}>
                <Heading size={'36px'} weight={600}>
                  THIS IS THE FOOTER
                </Heading>
              </DialogFooter> */}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </ClubProvider>
    </GQLRenderer>
  );
}

CreateLiveAuctionDialog.displayName = 'CreateLiveAuctionDialog';

export default CreateLiveAuctionDialog;
