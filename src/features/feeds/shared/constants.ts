import { FeedReactionAction, FeedReactionName } from './types';
import { IconName } from '@holdr-ui/react/dist/shared/types';

const IMAGE_GRID = {
  [1]: [{ rowSpan: 2, colSpan: 2 }],
  [2]: [
    { rowSpan: 2, colSpan: 1 },
    { rowSpan: 2, colSpan: 1 },
  ],
  [3]: [
    { rowSpan: 2, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
  ],
  [4]: [
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
  ],
};

type ImageSizes = 1 | 2 | 3 | 4;

const DIALOG_CONTENT_HEIGHT = {
  media: 725,
  poll: 750,
};

export { DIALOG_CONTENT_HEIGHT, IMAGE_GRID };

export type { ImageSizes };

export const FeedReactionArr = ['love', 'indifferent', 'excited', 'sad'];

export const feedReaction = [
  'love',
  'indifferent',
  'excited',
  'sad',
] as const;

export const Reaction: Record<
  FeedReactionName,
  { icon: IconName; name: string }
> = {
  love: { icon: 'heart-fill', name: 'Like' },
  indifferent: { icon: 'emotion-normal-fill', name: 'Indifferent' },
  sad: { icon: 'emotion-sad-fill', name: 'Sad' },
  excited: { icon: 'emotion-happy-fill', name: 'Excited' },
};

export const feedStatistic = ['views', 'bookmarks', 'reactions'] as const;

export const feedReactionFetchType = [
  'love',
  'indifferent',
  'excited',
  'sad',
  'all',
] as const;

export const feedAudience = ['members', 'everyone'] as const;

export const FeedReactionActions: Array<FeedReactionAction> = [
  {
    name: 'love',
    icon: {
      name: {
        inactive: 'heart-outline',
        active: 'heart-fill',
      },
      color: { active: '#de4747', hover: '#f4525226' },
    },
  },
  {
    name: 'excited',
    icon: {
      name: {
        inactive: 'emotion-happy-outline',
        active: 'emotion-happy-fill',
      },
      color: { active: '#c2c05a', hover: 'rgba(229,193,31,0.15)' },
    },
  },
  {
    name: 'sad',
    icon: {
      name: {
        inactive: 'emotion-sad-outline',
        active: 'emotion-sad-fill',
      },
      color: {
        active: '#2468c4',
        hover: 'rgba(72,158,173,0.15)',
      },
    },
  },
  {
    name: 'indifferent',
    icon: {
      name: {
        inactive: 'emotion-normal-outline',
        active: 'emotion-normal-fill',
      },
      color: {
        active: '#1c9110',
        hover: 'rgba(93,204,52,0.15)',
      },
    },
  },
];
