import {
  Avatar,
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
  NotificationSCName,
  NotificationType,
} from 'features/notifications/shared';
import { ReactNode } from 'react';
import { DateUtility, TextGroup, getSubComponent } from 'shared';

function NotificationItem({ children }: { children: ReactNode }) {
  const Avatar = getSubComponent<NotificationSCName>(
    children,
    'NotificationAvatar',
  );
  const Details = getSubComponent<NotificationSCName>(
    children,
    'NotificationDetails',
  );
  const MediaItem = getSubComponent<NotificationSCName>(
    children,
    'NotificationMediaItem',
  );
  const Action = getSubComponent<NotificationSCName>(
    children,
    'NotificationActionWrapper',
  );

  return (
    <HStack justify='space-between'>
      <HStack gap={4}>
        {Avatar}
        {Details}
      </HStack>
      <Center>
        {Action}
        {MediaItem}
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
          <TextGroup color='base300' fontSize={2}>
            <Text>{description.toLowerCase()}</Text>
            <Text>{DateUtility.fromNow(date.toDateString())}</Text>
          </TextGroup>
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
