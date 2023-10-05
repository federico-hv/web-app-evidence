import {
  feedAudience,
  feedReaction,
  feedReactionFetchType,
  feedStatistic,
} from './constants';
import { IconName } from '@holdr-ui/react/dist/shared/types';

export type FeedReactionName = (typeof feedReaction)[number];

export type FeedStatisticType = (typeof feedStatistic)[number];

export type FeedReactionFetchType = (typeof feedReactionFetchType)[number];

export type FeedAudienceName = (typeof feedAudience)[number];

export type FeedReactionAction = {
  name: FeedReactionName;
  icon: {
    name: { inactive: IconName; active: IconName };
    color: { hover: string; active: string };
  };
};
