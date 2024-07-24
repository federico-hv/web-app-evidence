import { FeedReactionAction, FeedReactionName } from './types';
import { IconName } from '@holdr-ui/react/dist/shared/types';

export const IMAGE_GRID = {
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

export const FeedMessage = {
  Created: 'Successfully created a new feed.',
  Deleted: 'Successfully deleted the feed.',
};

export type ImageSizes = 1 | 2 | 3 | 4;

export const feedReaction = [
  'love',
  'indifferent',
  'excited',
  'sad',
] as const;

export const feedStatistic = ['views', 'bookmarks', 'love'] as const;

export const feedReactionFetchType = [
  'love',
  'indifferent',
  'excited',
  'sad',
  'all',
] as const;

export const feedAudience = ['members', 'everyone'] as const;

export const ReactionIcon: Record<
  FeedReactionName,
  { active: IconName; inactive: IconName }
> = {
  love: {
    active: 'heart-fill',
    inactive: 'heart-outline',
  },
  sad: {
    active: 'emotion-sad-fill',
    inactive: 'emotion-sad-outline',
  },
  indifferent: {
    active: 'emotion-unhappy-fill',
    inactive: 'emotion-unhappy-outline',
  },
  excited: {
    active: 'emotion-happy-fill',
    inactive: 'emotion-happy-outline',
  },
};

export const FeedReactionActions: Array<FeedReactionAction> = [
  {
    name: 'love',
    icon: {
      name: ReactionIcon.love,
      color: { active: '#de4747', hover: '#f4525226' },
    },
  },
  {
    name: 'excited',
    icon: {
      name: ReactionIcon.excited,
      color: { active: '#c2c05a', hover: 'rgba(229,193,31,0.15)' },
    },
  },
  {
    name: 'sad',
    icon: {
      name: ReactionIcon.sad,
      color: {
        active: '#2468c4',
        hover: 'rgba(72,158,173,0.15)',
      },
    },
  },
  {
    name: 'indifferent',
    icon: {
      name: ReactionIcon.indifferent,
      color: {
        active: '#1c9110',
        hover: 'rgba(93,204,52,0.15)',
      },
    },
  },
];
