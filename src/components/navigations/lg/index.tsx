import { Box, HStack, Image } from '@holdr-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts';
import { GlobalSearch } from '../../overlays/';

import logoDark from 'assets/images/logo-dark.png';
import {
  AuthenticatedNavActions,
  UnauthenticatedNavActions,
} from './support';

function NavigationLg() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const goToHome = () => navigate('/');

  return (
    <HStack
      as='header'
      items='center'
      borderBottom={1}
      borderColor='base100'
      boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
      css={{
        '@bp1': { display: 'none' },
        '@bp3': { display: 'flex' },
      }}
    >
      <Box px={5} py={4} w={{ '@bp1': 75, '@bp7': 375 }}>
        <Box as='span' onClick={goToHome}>
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
