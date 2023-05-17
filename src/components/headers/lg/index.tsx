import { useContext } from 'react';
import { VStack } from '@holdr-ui/react';
import { AuthContext } from 'contexts';
import {
  AuthenticatedNavigation,
  UnauthenticatedNavigation,
} from './support';

function HeaderLg() {
  const { currentUser } = useContext(AuthContext);
  return (
    <VStack
      as='header'
      w={375}
      borderRight={2}
      borderColor='base100'
      h='full'
      css={{
        '@bp1': { display: 'none' },
        '@bp7': { display: 'flex' },
      }}
    >
      {currentUser ? (
        <AuthenticatedNavigation />
      ) : (
        <UnauthenticatedNavigation />
      )}
    </VStack>
  );
}
HeaderLg.displayName = 'HeaderLg';

export default HeaderLg;
