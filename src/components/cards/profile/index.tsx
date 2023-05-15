import { useNavigate } from 'react-router-dom';
import { Avatar, Card, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import { ProfileCardProps } from './profile-card.type';
import { ActionWrapper } from './support';

function ProfileCard({ currentUser }: ProfileCardProps) {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(currentUser.username);
  };

  return (
    <Card boxShadow='none'>
      <Card.Header borderBottom={2} borderColor='base100' py={2}>
        <HStack
          onClick={goToProfile}
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
        <ActionWrapper>
          <Text>Settings & Privacy</Text>
          <Icon name='settings-outline' size='lg' />
        </ActionWrapper>
        <ActionWrapper>
          <Text>Help & Support</Text>
          <Icon name='question-outline' size='lg' />
        </ActionWrapper>
        <ActionWrapper>
          <Text>Logout</Text>
          <Icon name='logout-outline' size='lg' />
        </ActionWrapper>
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
ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
