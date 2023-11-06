import { NotificationType } from '../../index';

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
