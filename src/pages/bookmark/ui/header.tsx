import { Heading, HStack } from '@holdr-ui/react';
import { useParams } from 'react-router-dom';
import { Menu } from '../../../shared';

function Header() {
  const params = useParams();
  return (
    <HStack
      w='100%'
      as='header'
      p={4}
      h={58}
      borderBottom={2}
      borderColor='base100'
      items='center'
      justify='space-between'
    >
      <Heading as='h2' size={4}>
        {params.id}
      </Heading>
      <Menu>
        <Menu.Trigger />
        <Menu.Header>{params.id}</Menu.Header>
        <Menu.Content>
          <Menu.Item icon='edit-box-outline'>Rename group</Menu.Item>
          <Menu.Item icon='close' dangerous>
            Remove group
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </HStack>
  );
}
Header.displayName = 'Header';

export default Header;
