import { FeedReactionName } from './types';
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
