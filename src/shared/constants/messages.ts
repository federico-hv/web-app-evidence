import { LabelWithIcon } from '../interfaces';

export const commonError =
  'Oops, something went wrong. Totally our fault, please try again later.';

export const RestrictAccountInfoPoints: LabelWithIcon[] = [
  {
    label:
      'Limit interactions without you having to unblock or unfollow someone.',
    icon: 'shield-keyhole-fill',
  },
  {
    label:
      'Mentions about yourself from the user will not be visible to you and you will not be notified about them.',
    icon: 'at',
  },
  {
    label:
      "Their chat will be moved to your hidden messages, so they won't be able to know when you have read it.",
    icon: 'send-outline',
  },
];

export const BlockAccountInfoPoints: LabelWithIcon[] = [
  {
    label:
      'The user will not be able to follow you or view your content on Holdr.',
    icon: 'user-unfollow-outline',
  },
  {
    label: 'The user will not be notified that they have been blocked.',
    icon: 'notification-outline',
  },
  {
    label: ' You can unblock the user anytime by going to your settings.',
    icon: 'search-outline',
  },
];
