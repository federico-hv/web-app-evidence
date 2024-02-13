import { Box } from '@holdr-ui/react';

function OpaquePlaceholder() {
  return (
    <Box
      display='none'
      bgColor='transparent'
      className='membership-card__opaque-cover'
      zIndex={1}
      h={54}
    />
  );
}
OpaquePlaceholder.displayName = 'OpaquePlaceholder';

export default OpaquePlaceholder;
