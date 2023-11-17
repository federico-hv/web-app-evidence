import { Box, VStack } from '@holdr-ui/react';
import {
  Head,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { ConnectButton, SpotifyUtility } from '../../../../features';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';

function ConnectionStep() {
  return (
    <Fragment>
      <Head prefix='' title='Platform connection' />
      <VStack gap={7} justify='space-between' h='100%'>
        <TextGroup mt={3}>
          <TextGroupHeading casing='capitalize'>
            Connect Music Service
          </TextGroupHeading>
          <TextGroupSubheading size={2}>
            Connect the music streaming services that you want to allow
            Holdr access. You can connect multiple streaming services to
            allow Holdr to get a full range of info about your favourite
            artists.
          </TextGroupSubheading>
        </TextGroup>

        <VStack
          gap={{ '@bp1': 3, '@bp3': 4 }}
          px={{ '@bp1': 1, '@bp3': 5 }}
        >
          <SpotifyButton />
          <AppleMusicButton />
        </VStack>

        <Box />
      </VStack>
    </Fragment>
  );
}

function SpotifyButton() {
  const location = useLocation();

  return (
    <ConnectButton
      provider='spotify'
      onClick={async () => {
        window.localStorage.setItem(
          'previous_location',
          JSON.stringify(location.state?.previousLocation || location),
        );
        await SpotifyUtility.requestCode();
      }}
    />
  );
}

function AppleMusicButton() {
  return (
    <ConnectButton
      provider='apple music'
      onClick={() => console.log('apple music')}
    />
  );
}

ConnectionStep.displayName = 'ConnectionStep';

export default ConnectionStep;
