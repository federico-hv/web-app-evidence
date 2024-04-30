import { useCurrentUser } from '../../auth';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  makePath,
  Paths,
  prefix,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';
import { Button, HStack, VStack } from '@holdr-ui/react';

function ConnectOnboardingView() {
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
        <Button radius={1} colorTheme='purple500' css={{ px: '25px' }}>
          Verify Now
        </Button>
      </VStack>
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
                Paths.setupArtist.socialMediaAccounts,
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
          colorTheme='purple200'
          variant='outline'
          onClick={onClose}
          css={{ px: '28px' }}
        >
          Skip for now
        </Button>
      </HStack>
    </VStack>
  );
}
ConnectOnboardingView.displayName = 'ConnectOnboardingView';

export default ConnectOnboardingView;
