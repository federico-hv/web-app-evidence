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
      minWidth={375}
      h='full'
      css={{
        '@bp1': { display: 'none' },
        '@bp7': { display: 'flex' },
      }}
    >
      <VStack
        position='fixed'
        t={65}
        w={375}
        h='calc(100% - 65px)'
        justify='space-between'
      >
        <VStack h='100%' justify='space-between' overflowY='scroll'>
          {currentUser ? (
            <AuthenticatedNavigation />
          ) : (
            <UnauthenticatedNavigation />
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
HeaderLg.displayName = 'HeaderLg';

export default HeaderLg;
