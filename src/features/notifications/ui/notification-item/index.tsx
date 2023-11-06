import {
  Avatar,
  Box,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { AvatarProps } from '@holdr-ui/react/dist/components/avatar/src/avatar.types';
import { ImageProps } from '@holdr-ui/react/dist/components/image/src/image.types';
import {
  NotificationActionWrapperProps,
  NotificationDetailsProps,
  NotificationType,
} from 'features/notifications/shared';
import { ReactNode } from 'react';
import { DateUtility, getSubComponent } from 'shared';

function NotificationItem({ children }: { children: ReactNode }) {
  const avatar = getSubComponent(children, 'NotificationAvatar');
  const details = getSubComponent(children, 'NotificationDetails');
  const mediaItem = getSubComponent(children, 'NotificationMediaItem');
  const action = getSubComponent(children, 'NotificationActionWrapper');

  return (
    <HStack justify='space-between'>
      <HStack gap={4}>
        {avatar}
        {details}
      </HStack>
      <Center>
        {action}
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

function NotificationMediaItem({
  src,
  size = 7,
  radius = 2,
  ...props
}: ImageProps) {
  return <Image src={src} size={size} radius={radius} {...props} />;
}

function NotificationActionWrapper({
  children,
}: NotificationActionWrapperProps) {
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

/* TODO: UPDATE THIS WITH CORRECT VALUES*/
export const NotificationDescription: Record<
  NotificationType,
  (args: string) => string
> = {
  relationship: (args: string) => {
    return 'followed you';
  },
  feed: (args: string) => {
    return args + ' a recent post';
  },
};

NotificationItem.Avatar = NotificationAvatar;
NotificationItem.Details = NotificationDetails;
NotificationItem.MediaItem = NotificationMediaItem;
NotificationItem.ActionWrapper = NotificationActionWrapper;

NotificationItem.displayName = 'NotificationItem';
NotificationAvatar.displayName = 'NotificationAvatar';
NotificationDetails.displayName = 'NotificationDetails';
NotificationMediaItem.displayName = 'NotificationMediaItem';
NotificationActionWrapper.displayName = 'NotificationActionWrapper';

export default NotificationItem;

export {
  NotificationAvatar,
  NotificationDetails,
  NotificationMediaItem,
  NotificationActionWrapper,
};
