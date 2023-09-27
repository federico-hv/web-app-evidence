import {
  feedAudience,
  feedReaction,
  feedReactionFetchType,
  feedStatistic,
} from './constants';

export type FeedReactionName = (typeof feedReaction)[number];

export type FeedStatistic = (typeof feedStatistic)[number];

export type FeedReactionFetchType = (typeof feedReactionFetchType)[number];

export type FeedAudienceName = (typeof feedAudience)[number];
