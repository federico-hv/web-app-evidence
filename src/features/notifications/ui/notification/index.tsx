import { Button } from '@holdr-ui/react';
import { voidFn } from '../../../../shared';
import {
  FeedEntity,
  INotification,
  NotificationDescription,
} from '../../shared';
import NotificationItem, {
  NotificationItemActionWrapper,
  NotificationItemAvatar,
  NotificationItemDetails,
  NotificationItemMediaItem,
} from '../notification-item';

interface NotificationProps {
  data: INotification;
  onClick?: VoidFunction;
}

function Notification({ data, onClick }: NotificationProps) {
  return (
    <NotificationItem onClick={onClick}>
      <NotificationItemAvatar
        src={data.actor.avatar + '?random=' + Math.random()}
      />
      <NotificationItemDetails
        name={data.actor.displayName}
        description={NotificationDescription[data.type](
          data.entity.action,
        )}
        date={data.createdAt}
      />
      {data.type === 'feed' && (
        <NotificationItemMediaItem
          src={
            (data.entity as FeedEntity).imageSrc +
            '?random=' +
            Math.random()
          }
        />
      )}
      {data.type === 'relationship' && (
        <NotificationItemActionWrapper>
          <Button colorTheme='white50' onClick={voidFn}>
            Follow
          </Button>
        </NotificationItemActionWrapper>
      )}
    </NotificationItem>
  );
}
Notification.displayName = 'Notification';

export default Notification;
