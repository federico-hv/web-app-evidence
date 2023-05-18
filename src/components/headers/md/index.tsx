import { VStack } from '@holdr-ui/react';

import {
  AuthenticatedNavigationMd,
  UnauthenticatedNavigationMd,
} from './support';
import { useContext } from 'react';
import { AuthContext } from 'contexts';

function HeaderMd() {
  const { currentUser } = useContext(AuthContext);
  return (
    <VStack
      as='header'
      w={75}
      borderRight={2}
      borderColor='base100'
      h='full'
      css={{
        '@bp1': {
          display: 'none',
        },
        '@bp3': {
          display: 'flex',
        },
        '@bp7': {
          display: 'none',
        },
      }}
    >
      <VStack
        position='fixed'
        t={65}
        w={75}
        h='calc(100% - 65px)'
        justify='space-between'
        items='center'
      >
        <VStack h='100%' justify='space-between' overflowY='scroll'>
          {currentUser ? (
            <AuthenticatedNavigationMd />
          ) : (
            <UnauthenticatedNavigationMd />
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
HeaderMd.displayName = 'HeaderMd';

export default HeaderMd;
