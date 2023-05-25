import { Box } from '@holdr-ui/react';

function ProfileOverlay() {
  return (
    <Box
      bgColor='clearTint500'
      position='absolute'
      t={{ '@bp1': 50, '@bp3': 0 }}
      b={0}
      l={0}
      zIndex={10}
      w='100%'
    />
  );
}
ProfileOverlay.displayName = 'ProfileOverlay';

export default ProfileOverlay;
