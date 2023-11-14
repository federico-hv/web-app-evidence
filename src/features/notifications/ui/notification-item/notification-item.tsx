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
} from 'features/notifications/shared';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DateUtility,
  Paths,
  TextGroup,
  getSubComponent,
  prefix,
} from 'shared';
import { BaseNotificationSCProps } from '../types';

function NotificationItem({
  children,
  onClose,
}: BaseNotificationSCProps & {
  children: ReactNode;
}) {
  const navigate = useNavigate();

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
    <HStack
      justify='space-between'
      _hover={{
        cursor: 'pointer',
        backgroundColor: '$base200',
        borderRadius: '$1',
      }}
      p={3}
      onClick={() => {
        onClose();
        navigate(prefix('/', Paths.notifications));
      }}
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

function NotificationAvatar({
  src,
  radius = 4,
  size = 'sm',
  ...props
}: AvatarProps) {
  return <Avatar src={src} radius={radius} size={size} {...props} />;
}

function NotificationMediaItem({
  src,
  size = '4',
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
    <VStack>
      <Text weight={500}>{name}</Text>
      <TextGroup
        direction='horizontal'
        color='base400'
        gap={3}
        fontSize={2}
        style={{ userSelect: 'none' }}
      >
        <TextGroup.Subheading>
          {description.toLowerCase()}
        </TextGroup.Subheading>
        <TextGroup.Subheading>
          {`${DateUtility.fromNow(date.toDateString())} ago`}
        </TextGroup.Subheading>
      </TextGroup>
    </VStack>
  );
}

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
