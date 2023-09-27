import { Box, Image } from '@holdr-ui/react';

// TODO: Fix this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logoDark from '../../../assets/images/logo-dark.png';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/'>
      <Box as='span'>
        <Image size={{ '@bp1': '16px', '@bp4': '30px' }} src={logoDark} />
      </Box>
    </Link>
  );
}
Logo.displayName = 'Logo';

export default Logo;
