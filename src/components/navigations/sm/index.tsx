import { Box } from '@holdr-ui/react';
import { useContext } from 'react';
import { AuthContext } from 'contexts';
import {
  AuthenticatedNavigationSm,
  UnauthenticatedNavigationSm,
} from './support';

function NavigationSm() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Box
      b={0}
      w='100vw'
      position='fixed'
      borderColor='base100'
      borderTop={2}
      css={{
        '@bp3': { display: 'none' },
        borderTopRightRadius: '$4',
        borderTopLeftRadius: '$4',
      }}
    >
      {currentUser ? (
        <AuthenticatedNavigationSm />
      ) : (
        <UnauthenticatedNavigationSm />
      )}
    </Box>
  );
}
NavigationSm.displayName = 'NavigationSm';

export default NavigationSm;
