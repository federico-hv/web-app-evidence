import { useNavigate } from 'react-router-dom';
import { Avatar, Card, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import { ProfileCardProps } from './profile-card.type';
import { ActionWrapper } from './support';
import { LogoutDialog } from '../../dialogs';
import { Paths } from 'shared';

function ProfileCardLg({ currentUser }: ProfileCardProps) {
  const navigate = useNavigate();

  const open = {
    profile: () => navigate(currentUser.username),
    settings: () => navigate(Paths.settings),
    support: () => navigate(Paths.support),
  };

  return (
    <Card boxShadow='none'>
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
            src={currentUser.avatarUrl}
            name={currentUser.displayName}
          />
          <VStack gap={1}>
            <Text>{currentUser.displayName}</Text>
            <Text
              size={1}
              css={{
                verticalAlign: 'middle',
                display: 'inline-flex',
              }}
            >
              <Icon name='at' />
              {currentUser.username}
            </Text>
          </VStack>
        </HStack>
      </Card.Header>
      <Card.Body py={2}>
        <ActionWrapper onClick={open.settings}>
          <Text>Settings & Privacy</Text>
          <Icon name='settings-outline' size='lg' />
        </ActionWrapper>
        <ActionWrapper onClick={open.support}>
          <Text>Help & Support</Text>
          <Icon name='question-outline' size='lg' />
        </ActionWrapper>
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
ProfileCardLg.displayName = 'ProfileCardLg';

export default ProfileCardLg;
