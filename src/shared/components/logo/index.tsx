import { Box, Image } from '@holdr-ui/react';

// TODO: Fix this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Link } from 'react-router-dom';
import { Asset } from '../../constants';

function Logo() {
  return (
    <Link to='/'>
      <Box as='span'>
        <Image
          size={{ '@bp1': '16px', '@bp4': '30px' }}
          src={Asset.Image.LogoLight}
        />
      </Box>
    </Link>
  );
}
Logo.displayName = 'Logo';

export default Logo;
