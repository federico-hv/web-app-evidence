import { Box, HStack, Image } from '@holdr-ui/react';
import { useContext } from 'react';

import { AuthContext } from '../../../contexts';
import { GlobalSearch } from '../../overlay';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logoDark from '../../../assets/images/logo-dark.png';

import {
  AuthenticatedNavActions,
  UnauthenticatedNavActions,
} from './support';
import { useMenuNavigate } from '../../../hooks';

function NavigationLg() {
  const { currentUser } = useContext(AuthContext);

  const { goto } = useMenuNavigate();

  return (
    <HStack
      as='header'
      items='center'
      position='fixed'
      t={0}
      w='100%'
      borderBottom={1}
      borderColor='base100'
      boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
      css={{
        backgroundColor: '#fbfbfa',
        '@bp1': { display: 'none' },
        '@bp3': { display: 'flex' },
        zIndex: 15,
      }}
    >
      <Box px={5} py={4} w={{ '@bp1': 75, '@bp7': 375 }}>
        <Box as='span' onClick={goto.home}>
          <Image size={{ '@bp1': 2, '@bp4': 30 }} src={logoDark} />
        </Box>
      </Box>

      <Box
        h='2rem'
        w={{
          '@bp1': 'calc(100% - 235px)',
          '@bp5': 'calc(100% - 450px)',
          '@bp7': 'calc(100% - 750px)',
        }}
      >
        <GlobalSearch />
      </Box>
      <HStack
        py={4}
        pr={5}
        w={{ '@bp1': 160, '@bp5': 375 }}
        items='center'
        justify='flex-end'
      >
        {currentUser ? (
          <AuthenticatedNavActions />
        ) : (
          <UnauthenticatedNavActions />
        )}
      </HStack>
    </HStack>
  );
}
NavigationLg.displayName = 'NavigationLg';

export default NavigationLg;
