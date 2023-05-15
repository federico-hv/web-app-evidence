import {
  Avatar,
  Button,
  Card,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';
import { extraBtnPadding, Paths } from 'shared';
import { ActionWrapper } from '../profile-lg/support';
import { ProfileCardProps } from '../profile-lg/profile-card.type';
import { useNavigate } from 'react-router-dom';

function ProfileCardSm({ currentUser, onClose }: ProfileCardProps) {
  const navigate = useNavigate();

  const open = {
    profile: () => {
      onClose && onClose();
      navigate(currentUser.username);
    },
    settings: () => {
      onClose && onClose();
      navigate(Paths.settings);
    },
    support: () => {
      onClose && onClose();
      navigate(Paths.support);
    },
  };
  return (
    <Card boxShadow='none' h={350}>
      <Card.Header py={4} items='center'>
        <HStack
          gap={3}
          p={2}
          items='center'
          radius='full'
          border={2}
          borderColor='base100'
          onClick={open.profile}
          _hover={{ backgroundColor: '$base100' }}
        >
          <Avatar
            size='xs'
            src={currentUser.avatarUrl}
            name={currentUser.displayName}
          />
          <VStack>
            <Text>{currentUser.displayName}</Text>
          </VStack>
        </HStack>
      </Card.Header>
      <Card.Body borderTop={2} borderColor='base100'>
        <ActionWrapper onClick={open.settings}>
          <Text>Settings & Privacy</Text>
          <Icon name='settings-outline' size='lg' />
        </ActionWrapper>
        <ActionWrapper onClick={open.support}>
          <Text>Help & Support</Text>
          <Icon name='question-outline' size='lg' />
        </ActionWrapper>
        <ActionWrapper>
          <Text>Logout</Text>
          <Icon name='logout-outline' size='lg' />
        </ActionWrapper>
      </Card.Body>
      <Card.Footer
        h='calc(100% - 222px)'
        p={3}
        justify='center'
        borderTop={2}
        borderColor='base100'
      >
        <Button
          colorTheme='secondary400'
          className={extraBtnPadding()}
          label='Holdr Club'
          fullWidth
        />
      </Card.Footer>
    </Card>
  );
}
ProfileCardSm.displayName = 'ProfileCardSm';

export default ProfileCardSm;
