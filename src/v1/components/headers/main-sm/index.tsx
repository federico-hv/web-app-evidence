import { useContext } from 'react';
import { Box, Center, HStack, Image } from '@holdr-ui/react';
import { AuthContext } from '../../../contexts';
import { ProfileDrawer } from '../../drawers';
import logoDark from '../../../assets/images/logo-dark.png';

function MainHeaderSm() {
  const { currentUser } = useContext(AuthContext);
  return (
    <HStack
      py={4}
      px={3}
      justify='space-between'
      items='center'
      w='100%'
      borderBottom={2}
      borderColor='base100'
      css={{ '@bp3': { display: 'none' } }}
    >
      <Box flex={1}>
        {currentUser && <ProfileDrawer {...currentUser} />}
      </Box>
      <Center flex={1}>
        <Image size={25} src={logoDark} />
      </Center>
      <Box flex={1} />
    </HStack>
  );
}
MainHeaderSm.displayName = 'MainHeaderSm';
export default MainHeaderSm;
