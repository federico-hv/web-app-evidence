import { Box, Circle, HStack, Text } from '@holdr-ui/react';
import {
  LinkOverlay,
  makePath,
  Paths,
  usePreviousLocation,
} from '../../../../../shared';
import { SetupStepProps } from './types';
import { Link } from 'react-router-dom';

function SetupStep({ number, path, description, active }: SetupStepProps) {
  const previousLocation = usePreviousLocation('/');

  return (
    <Box position='relative'>
      <LinkOverlay
        state={{ previousLocation }}
        to={makePath([Paths.setupProfile, Paths.artist, path])}
      />

      <HStack items='center' gap={3}>
        <Circle
          fontSize={2}
          size='20px'
          color={active ? '#30304B' : 'white700'}
          bgColor={active ? 'purple200' : undefined}
          border={active ? 0 : 1}
          borderColor={active ? undefined : 'white700'}
        >
          {number}
        </Circle>
        <Text
          weight={300}
          casing='capitalize'
          color={active ? 'purple200' : 'white700'}
        >
          {description}
        </Text>
      </HStack>
    </Box>
  );
}
SetupStep.displayName = 'ArtistSetupStep';

export default SetupStep;
