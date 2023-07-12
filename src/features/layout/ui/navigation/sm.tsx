import { Flex, HStack } from '@holdr-ui/react';
import { Logo } from '../../../../shared/components';

function SmNavigation() {
  return (
    <HStack
      as='header'
      items='center'
      position='fixed'
      p={4}
      t={0}
      w='100%'
      borderBottom={1}
      borderColor='base100'
      boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
      css={{
        backgroundColor: '#fbfbfa',
        zIndex: 15,
      }}
    >
      <Flex flex={1}></Flex>
      <Logo />
      <Flex flex={1}></Flex>
    </HStack>
  );
}

SmNavigation.displayName = 'SmNavigation';

export default SmNavigation;
