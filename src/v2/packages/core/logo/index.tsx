import { Box, Image } from '@holdr-ui/react';

// TODO: Fix this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logoDark from '../../../assets/images/logo-dark.png';

function Logo() {
  return (
    <Box as='span'>
      <Image size={{ '@bp1': 2, '@bp4': 30 }} src={logoDark} />
    </Box>
  );
}
Logo.displayName = 'Logo';

export default Logo;
