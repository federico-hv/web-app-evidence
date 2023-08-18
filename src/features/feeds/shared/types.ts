import {
  feedReaction,
  feedReactionFetchType,
  feedStatistic,
} from './constants';

export type FeedReactionName = (typeof feedReaction)[number];

export type FeedStatistic = (typeof feedStatistic)[number];

export type FeedReactionFetchType = (typeof feedReactionFetchType)[number];
