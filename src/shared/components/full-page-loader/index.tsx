import { Center, Icon } from '@holdr-ui/react';
import { MotionBox } from '../../styles';

function FullPageLoader() {
  return (
    <Center position='fixed' h='h-screen' w='w-screen' bgColor='#141317'>
      <MotionBox
        fontSize='4.5rem'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
      >
        <Icon name='logo-small' />
      </MotionBox>
    </Center>
  );
}

export default FullPageLoader;
