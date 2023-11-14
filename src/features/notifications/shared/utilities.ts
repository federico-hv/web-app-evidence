import { NotificationType } from './types';

/* TODO: UPDATE THIS WITH CORRECT VALUES*/
export const NotificationDescription: Record<
  NotificationType,
  (args: string) => string
> = {
  relationship: (args: string) => {
    console.log(args);
    return 'followed you';
  },
  feed: (args: string) => {
    return args + ' a recent post';
  },
};
