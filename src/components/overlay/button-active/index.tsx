import { Box } from '@holdr-ui/react';
import { theme } from '../../../configs';

function ButtonActiveOverlay() {
  return (
    <Box
      position='absolute'
      t={0}
      l={0}
      h='100%'
      w='100%'
      bgColor='darkTint300'
      css={{
        opacity: 0,
        transitionProperty: theme.transitions['property-common'],
        transitionDuration: theme.transitions['duration-faster'],
        transitionTimingFunction: 'ease-in',

        '&:active': { opacity: 0.25 },
      }}
    />
  );
}
ButtonActiveOverlay.displayName = 'ButtonActiveOverlay';

export default ButtonActiveOverlay;
