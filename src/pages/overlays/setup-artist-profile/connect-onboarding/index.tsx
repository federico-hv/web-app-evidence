import {
  ConnectedAccountStatus,
  GET_CONNECT_ACCOUNT_STATUS,
  useLazyIsArtistProfileComplete,
} from '../../../../features';
import { useNavigate } from 'react-router-dom';
import {
  Loader,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { Button, HStack, useDisclosure, VStack } from '@holdr-ui/react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { OnboardingStatus, OnboardingFormDialog } from './ui';
import { SectionHeader } from '../ui';

function ConnectOnboardingView() {
  const previousLocation = usePreviousLocation('/');

  const {
    isOpen: isDialogOpen,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  const [getConnectAccountStatus, { loading: loading2 }] = useLazyQuery<{
    connectAccountStatus: ConnectedAccountStatus;
  }>(GET_CONNECT_ACCOUNT_STATUS, { fetchPolicy: 'network-only' });

  const { getIsArtistProfileComplete, loading: loading3 } =
    useLazyIsArtistProfileComplete();

  const { loading, data } = useQuery<{
    connectAccountStatus: ConnectedAccountStatus;
  }>(GET_CONNECT_ACCOUNT_STATUS, { fetchPolicy: 'network-only' });

  const navigate = useNavigate();

  const onClose = async () => {
    await getIsArtistProfileComplete();

    navigate(previousLocation);
  };

  const handleCloseDialog = async () => {
    onCloseDialog();

    await getConnectAccountStatus();
  };

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <SectionHeader
          required
          title='Verification'
          subtitle='To create live auctions, we need to verify your identity'
        />
      </VStack>
      <Loader loading={loading || loading2}>
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
            onClose={handleCloseDialog}
          />
        )}

        <HStack
          justify='flex-end'
          position='absolute'
          b={0}
          r={0}
          w='fit-content'
          bgColor='#30304B'
          gap={3}
          pl={56}
          pr={56}
          pb={56}
          pt='14px'
        >
          <Button
            variant='ghost'
            radius={1}
            onClick={() =>
              navigate(
                makePath([
                  Paths.setupArtists,
                  Paths.setupArtist.customURL,
                ]),
                {
                  state: {
                    previousLocation,
                  },
                },
              )
            }
            colorTheme='purple200'
            css={{ px: '40px' }}
          >
            Go back
          </Button>
          <Button
            isLoading={loading3}
            loadingText='Continue'
            radius={1}
            colorTheme='purple500'
            onClick={onClose}
            css={{ px: '28px' }}
          >
            Skip for now
          </Button>
        </HStack>
      </Loader>
    </VStack>
  );
}
ConnectOnboardingView.displayName = 'ConnectOnboardingView';

export default ConnectOnboardingView;
