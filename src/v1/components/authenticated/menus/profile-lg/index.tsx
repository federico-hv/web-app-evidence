import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, HStack, Text, VStack } from '@holdr-ui/react';
import { AuthenticatedProfileMenuProps } from './profile-menu.type';
import { LogoutDialog } from '../../../dialog';
import { Paths, textEllipsis } from '../../../../shared';
import { MenuButton } from '../../../buttons';

function AuthenticatedProfileMenuLg({
  onClose,
  currentUser,
}: AuthenticatedProfileMenuProps) {
  const navigate = useNavigate();

  const open = {
    profile: () => {
      navigate(currentUser ? currentUser.username : '');
      onClose && onClose();
    },
    settings: () => {
      navigate(Paths.settings);
      onClose && onClose();
    },
    support: () => {
      navigate(Paths.support);
      onClose && onClose();
    },
  };

  return (
    <Card boxShadow='none' w='100%'>
      <Card.Header borderBottom={2} borderColor='base100' py={2}>
        <HStack
          onClick={open.profile}
          items='center'
          gap={3}
          py={3}
          px={3}
          radius={2}
          cursor='pointer'
          _hover={{
            background: '$base100',
          }}
        >
          <Avatar
            src={currentUser.avatar}
            name={currentUser.displayName}
            variant='squircle'
          />
          <VStack
            gap={1}
            overflow='hidden'
            as='a'
            title={currentUser.displayName}
          >
            <Box
              overflow='hidden'
              className={textEllipsis()}
              css={{ fontWeight: 600 }}
            >
              {currentUser.displayName}
            </Box>
            <Text
              size={1}
              weight={600}
              color='base400'
              css={{
                verticalAlign: 'middle',
                display: 'inline-flex',
              }}
            >
              @{currentUser.username}
            </Text>
          </VStack>
        </HStack>
      </Card.Header>
      <Card.Body
        py={2}
        divider={<Box borderBottom={1} borderColor='base100' />}
      >
        <MenuButton
          label='Settings & Privacy'
          icon='settings-outline'
          onClick={open.settings}
        />
        <MenuButton
          label='Help & Support'
          icon='question-outline'
          onClick={open.support}
        />
        <LogoutDialog />
      </Card.Body>
      <Card.Footer
        direction='horizontal'
        items='center'
        gap={3}
        px={3}
        borderTop={2}
        borderColor='base100'
        divider={<Text>·</Text>}
      >
        <Text size={2}>Privacy</Text>
        <Text size={2}>Terms</Text>
        <Text size={2}>© Holdr 2023</Text>
      </Card.Footer>
    </Card>
  );
}
AuthenticatedProfileMenuLg.displayName = 'AuthenticatedProfileMenuLg';

export default AuthenticatedProfileMenuLg;
