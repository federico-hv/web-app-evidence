import { Box, HStack, Image } from '@holdr-ui/react';
import logoDark from 'assets/images/logo-dark.png';
import { useNavigate } from 'react-router-dom';

function NavigationLg() {
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <HStack
      as='header'
      items='center'
      borderBottom={1}
      borderColor='base100'
      boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
    >
      <Box px={5} py={4} w={350}>
        <Box as='span' onClick={goHome}>
          <Image size={30} src={logoDark} />
        </Box>
      </Box>

      <Box px={4} h='2rem' w='calc(100% - 700px)' />

      <Box w={350} h='2rem' />
    </HStack>
  );
}
NavigationLg.displayName = 'NavigationLg';

export default NavigationLg;
