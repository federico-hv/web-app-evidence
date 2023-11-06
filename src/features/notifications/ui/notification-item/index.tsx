import {
  Avatar,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { AvatarProps } from '@holdr-ui/react/dist/components/avatar/src/avatar.types';
import {
  NotificationActionButtonProps,
  NotificationDetailsProps,
  NotificationMediaItemProps,
} from 'features/notifications/shared';
import { ReactNode } from 'react';
import { DateUtility, getSubComponent } from 'shared';

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
      <HStack gap={4}>
        {avatar}
        {details}
      </HStack>
      <Center>
        {actionButton}
        {mediaItem}
      </Center>
    </HStack>
  );
}

function NotificationAvatar({
  src,
  radius = 4,
  size = 'lg',
  ...props
}: AvatarProps) {
  return <Avatar src={src} radius={radius} size={size} {...props} />;
}

function NotificationMediaItem({ mediaItem }: NotificationMediaItemProps) {
  return <Image src={mediaItem} size={7} radius={2} />;
}

function NotificationActionButton({
  children,
}: NotificationActionButtonProps) {
  return <>{children}</>;
}

function NotificationDetails({
  name,
  description,
  date,
}: NotificationDetailsProps) {
  return (
    <Center>
      <VStack gap={2}>
        <Text weight={500}>{name}</Text>
        <HStack gap={3}>
          <Text color='base300' size={2}>
            {description.toLowerCase()}
          </Text>
          <Text color='base300' size={2}>
            {DateUtility.fromNow(date.toDateString())}
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

export {
  NotificationAvatar,
  NotificationDetails,
  NotificationMediaItem,
  NotificationActionButton,
};
