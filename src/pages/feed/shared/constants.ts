import {
  FeedReactionFetchType,
  FeedReactionName,
} from '../../../features';

export const ReadableFeedReactionOption: Record<
  FeedReactionFetchType,
  string
> = {
  all: 'any sentiment',
  excited: 'excitement',
  indifferent: 'indifference',
  love: 'love',
  sad: 'sadness',
};

export const FeedReactionTabOptions: (FeedReactionName | 'all')[] = [
  'all',
  'love',
  'excited',
  'sad',
  'indifferent',
];

export const ReadableFeedReaction: Record<
  FeedReactionName | 'all',
  string
> = {
  all: 'All',
  love: 'Likes',
  excited: 'Excited',
  sad: 'Sad',
  indifferent: 'Indifferent',
};
