import { Avatar, Box, Center, HStack, Image } from '@holdr-ui/react';
import { AvatarProps } from '@holdr-ui/react/dist/components/avatar/src/avatar.types';
import { ImageProps } from '@holdr-ui/react/dist/components/image/src/image.types';
import {
  NotificationActionWrapperProps,
  NotificationDetailsProps,
  NotificationItemSCName,
} from 'features/notifications/shared';
import {
  DateUtility,
  TextGroup,
  getSubComponent,
  TextGroupSubheading,
  GenericProps,
} from 'shared';

function NotificationItem({ children, onClick }: GenericProps) {
  const Avatar = getSubComponent<NotificationItemSCName>(
    children,
    'NotificationItemAvatar',
  );
  const Details = getSubComponent<NotificationItemSCName>(
    children,
    'NotificationItemDetails',
  );
  const MediaItem = getSubComponent<NotificationItemSCName>(
    children,
    'NotificationItemMediaItem',
  );
  const Action = getSubComponent<NotificationItemSCName>(
    children,
    'NotificationItemActionWrapper',
  );

  return (
    <HStack
      justify='space-between'
      cursor='pointer'
      radius={2}
      _hover={{
        backgroundColor: '$base100',
      }}
      p={4}
      onClick={onClick}
    >
      <HStack gap={3}>
        <Center>{Avatar}</Center>
        {Details}
      </HStack>
      <Center>
        {Action}
        {MediaItem}
      </Center>
    </HStack>
  );
}

function NotificationItemAvatar({
  src,
  size = 'base',
  ...props
}: AvatarProps) {
  return <Avatar src={src} variant='squircle' size={size} {...props} />;
}

function NotificationItemMediaItem({
  src,
  size = '5',
  radius = 2,
  ...props
}: ImageProps) {
  return <Image src={src} size={size} radius={radius} {...props} />;
}

function NotificationItemActionWrapper({
  children,
}: NotificationActionWrapperProps) {
  return <>{children}</>;
}

function NotificationItemDetails({
  name,
  description,
  date,
}: NotificationDetailsProps) {
  return (
    <TextGroup gap={0}>
      <TextGroupSubheading size={2} weight={500}>
        {name}
      </TextGroupSubheading>
      <HStack items='center' gap={2} divider={<Box>·</Box>}>
        <TextGroupSubheading size={1}>
          {description.toLowerCase()}
        </TextGroupSubheading>
        <TextGroupSubheading size={1}>
          {`${DateUtility.fromNow(date.toDateString())} ago`}
        </TextGroupSubheading>
      </HStack>
    </TextGroup>
  );
}

NotificationItem.Avatar = NotificationItemAvatar;
NotificationItem.Details = NotificationItemDetails;
NotificationItem.MediaItem = NotificationItemMediaItem;
NotificationItem.ActionWrapper = NotificationItemActionWrapper;

NotificationItem.displayName = 'NotificationItem';
NotificationItemAvatar.displayName = 'NotificationItemAvatar';
NotificationItemDetails.displayName = 'NotificationItemDetails';
NotificationItemMediaItem.displayName = 'NotificationItemMediaItem';
NotificationItemActionWrapper.displayName =
  'NotificationItemActionWrapper';

export default NotificationItem;
export {
  NotificationItemAvatar,
  NotificationItemDetails,
  NotificationItemMediaItem,
  NotificationItemActionWrapper,
};
