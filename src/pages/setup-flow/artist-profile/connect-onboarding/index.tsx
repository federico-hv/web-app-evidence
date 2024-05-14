import {
  GET_CONNECT_ACCOUNT_STATUS,
  IConnectedAccount,
  useCreateCustomAccountSession,
  useCurrentUser,
} from '../../../../features';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Loader,
  makePath,
  Paths,
  prefix,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useCounter,
} from '../../../../shared';
import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js';
import {
  loadConnectAndInitialize,
  StripeConnectInstance,
} from '@stripe/connect-js';
import { useQuery } from '@apollo/client';

type ConnectedAccountStatus = 'Pending' | 'Complete' | 'Restricted';

function useOnboardingConnectInstance() {
  const { createSession } = useCreateCustomAccountSession();

  const renderAfterCalled = useRef(false);

  const [loading, setLoading] = useState(true);

  const fetchClientSecret = useCallback(async () => {
    setLoading(true);

    const { data } = await createSession();

    if (!data) {
      return '';
    }

    setLoading(false);

    return data.createCustomAccountSession.client_secret;
  }, []);

  const [connectInstance, set] = useState<StripeConnectInstance>();

  useEffect(() => {
    if (!renderAfterCalled.current) {
      set(() => {
        return loadConnectAndInitialize({
          publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
          fetchClientSecret: fetchClientSecret,
          appearance: {
            variables: {
              colorPrimary: '#6666FF',
              colorBackground: '#30304B',
              actionPrimaryColorText: '#9898FF',
              spacingUnit: '12px',
            },
          },
        });
      });
    }

    renderAfterCalled.current = true;
  }, []);

  return { connectInstance, loading, error: null };
}

function OnboardingFormDialog(props: {
  onClose: VoidFunction;
  onOpen: VoidFunction;
  isOpen: boolean;
}) {
  const { connectInstance } = useOnboardingConnectInstance();

  return (
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay zIndex={25} />
        <DialogContent
          minWidth={600}
          h={800}
          maxHeight='90vh'
          zIndex={25}
          bgColor='#30304B'
          overflow='auto'
        >
          <DialogBody py={4}>
            {connectInstance && (
              <ConnectComponentsProvider connectInstance={connectInstance}>
                <ConnectAccountOnboarding
                  onExit={() => {
                    console.log('Onboarding done');
                  }}
                  collectionOptions={{
                    fields: 'eventually_due',
                    futureRequirements: 'include',
                  }}
                  fullTermsOfServiceUrl='https://stripe.com'
                  recipientTermsOfServiceUrl='https://stripe.com'
                  privacyPolicyUrl='https://stripe.com'
                  // skipTermsOfServiceCollection={false}
                />
              </ConnectComponentsProvider>
            )}
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function OnboardingStatus({ status }: { status: ConnectedAccountStatus }) {
  return (
    <Fragment>
      {status === 'Pending' && (
        <VStack
          divider={
            <Box
              my={3}
              h={48}
              ml={12}
              borderLeft={1}
              borderStyle='dashed'
              borderColor='clearTint300'
            />
          }
        >
          <HStack gap={1} items='center' fontSize={6}>
            <Icon color='success300' name='circle-check-fill' />
            <Text weight={500} size={2}>
              KYC Details Submitted
            </Text>
          </HStack>
          <VStack>
            <HStack gap={1} items='center' fontSize={6}>
              <Icon color='warning300' name='warning-fill' />
              <Text weight={500} size={2}>
                Verification Pending
              </Text>
            </HStack>
            <Text ml={7} size={1} color='white700'>
              {
                "It may take 1-2 days. We'll notify you once you're approved. Continue to complete your profile."
              }
            </Text>
          </VStack>
        </VStack>
      )}
      {status === 'Complete' && (
        <HStack gap={1} items='center' fontSize={6}>
          <Icon color='success300' name='circle-check-fill' />
          <Text weight={500} size={2}>
            KYC Verification Completed
          </Text>
        </HStack>
      )}
    </Fragment>
  );
}

function ConnectOnboardingView() {
  const {
    isOpen: isDialogOpen,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  const { loading, data } = useQuery<{
    connectAccountStatus: ConnectedAccountStatus;
  }>(GET_CONNECT_ACCOUNT_STATUS);

  const user = useCurrentUser();

  const navigate = useNavigate();

  const location = useLocation();

  const onClose = () => {
    const previousLocation = location.state?.previousLocation;

    navigate(previousLocation || prefix('/', user ? user.username : ''));
  };

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Verification</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            To create live auctions, we need to verify your identity
          </TextGroupSubheading>
        </TextGroup>
      </VStack>
      <Loader loading={loading}>
        <Fragment></Fragment>
        {data && !data.connectAccountStatus && (
          <Button
            onClick={onOpenDialog}
            radius={1}
            colorTheme='purple500'
            css={{ px: '25px' }}
          >
            Verify Now
          </Button>
        )}

        {data && data.connectAccountStatus === 'Restricted' && (
          <Button
            onClick={onOpenDialog}
            radius={1}
            colorTheme='purple500'
            css={{ px: '25px' }}
          >
            Continue Application
          </Button>
        )}

        {data && data.connectAccountStatus !== 'Restricted' && (
          <OnboardingStatus status={data.connectAccountStatus} />
        )}

        {isDialogOpen && (
          <OnboardingFormDialog
            isOpen={isDialogOpen}
            onOpen={onOpenDialog}
            onClose={onCloseDialog}
          />
        )}

        <HStack
          justify='flex-end'
          position='absolute'
          b='1.5rem'
          l='3rem'
          r='3rem'
          bgColor='#30304B'
          gap={3}
        >
          <Button
            variant='ghost'
            radius={1}
            onClick={() =>
              navigate(
                makePath([
                  Paths.setupProfile,
                  Paths.artist,
                  Paths.setupArtist.customURL,
                ]),
              )
            }
            colorTheme='purple200'
            css={{ px: '40px' }}
          >
            Go back
          </Button>
          <Button
            radius={1}
            colorTheme='purple500'
            onClick={onClose}
            css={{ px: '28px' }}
          >
            Continue
          </Button>
        </HStack>
      </Loader>
    </VStack>
  );
}
ConnectOnboardingView.displayName = 'ConnectOnboardingView';

export default ConnectOnboardingView;
