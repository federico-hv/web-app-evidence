import { Avatar, Circle, Flex, HStack, Image } from '@holdr-ui/react';
import { Logo } from '../../../../shared/components';
import menuIcon from '../../../../assets/images/menu.png';
import { useCurrentUser } from '../../../auth';

function MenuDrawer() {
  return (
    <Flex flex={1}>
      <Image size={24} src={menuIcon} alt='menu icon' />
    </Flex>
  );
}

function ProfileDrawer() {
  const currentUser = useCurrentUser();
  return (
    <HStack flex={1} justify='flex-end'>
      {currentUser ? (
        <Avatar
          size='sm'
          src={currentUser?.avatar}
          name={currentUser?.displayName}
        />
      ) : (
        <Circle size={24} />
      )}
    </HStack>
  );
}

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
      <MenuDrawer />
      <Logo />
      <ProfileDrawer />
    </HStack>
  );
}

SmNavigation.displayName = 'SmNavigation';

export default SmNavigation;
