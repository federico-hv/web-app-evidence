import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { ReactNode } from 'react';
import { getSubComponent } from 'shared';

function NotificationItem({ children }: { children: ReactNode }) {
  const avatar = getSubComponent(children, 'NotificationAvatar');
  const details = getSubComponent(children, 'NotificationDetails');
  const mediaItem = getSubComponent(children, 'NotificationMediaItem');
  const actionButton = getSubComponent(
    children,
    'NotificationActionButton',
  );

  return (
    <HStack justify='space-between'>
      <HStack>
        <Center pr={4}>{avatar}</Center>
        {details}
      </HStack>
      <Center>
        {actionButton}
        {mediaItem}
      </Center>
    </HStack>
  );
}

function NotificationAvatar({ avatarImage }: { avatarImage: string }) {
  return <Avatar src={avatarImage} radius={4} size='lg' />;
}

function NotificationMediaItem({ mediaItem }: { mediaItem: string }) {
  console.log(mediaItem);
  return <Image src={mediaItem} size={7} radius={2} />;
}

function NotificationActionButton({
  onClick,
  children,
}: {
  onClick: VoidFunction;
  children: ReactNode;
}) {
  return <Button onClick={onClick}>{children}</Button>;
}

function NotificationDetails({
  name,
  description,
  timeFromNow,
}: {
  name: string;
  description: string;
  timeFromNow: string;
}) {
  return (
    <Center>
      <VStack gap={2}>
        <Text weight={500}>{name}</Text>
        <HStack gap={3}>
          <Text color='base300' size={2}>
            {description.toLowerCase()}
          </Text>
          <Text color='base300' size={2}>
            {timeFromNow}
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
}

NotificationItem.Avatar = NotificationAvatar;
NotificationItem.Details = NotificationDetails;
NotificationItem.MediaItem = NotificationMediaItem;
NotificationItem.ActionButton = NotificationActionButton;

NotificationItem.displayName = 'NotificationItem';
NotificationAvatar.displayName = 'NotificationAvatar';
NotificationDetails.displayName = 'NotificationDetails';
NotificationMediaItem.displayName = 'NotificationMediaItem';
NotificationActionButton.displayName = 'NotificationActionButton';

export default NotificationItem;
