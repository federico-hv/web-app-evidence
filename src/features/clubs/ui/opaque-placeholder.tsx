import { Box } from '@holdr-ui/react';

function OpaquePlaceholder() {
  return (
    <Box
      display='none'
      bgColor='transparent'
      className='membership-card__opaque-cover'
      zIndex={1}
      // position='absolute'
      // l={-1}
      // t={-81}

      h={54}
    />
  );
}
OpaquePlaceholder.displayName = 'OpaquePlaceholder';

export default OpaquePlaceholder;
