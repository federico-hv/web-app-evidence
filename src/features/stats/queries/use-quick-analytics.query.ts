import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_QUICK_ANALYTOCS } from './schema';
import { IStatisticValue } from '../shared';

interface IQuickAnalytics {
  clubAnalytics: {
    clubViews: IStatisticValue;
    averageBidders: IStatisticValue;
  };
  socialAnalytics: {
    peakEngagementTime: string;
    socialInteractions: IStatisticValue;
  };
}

export function useQuickAnalyticsQuery() {
  return useQuery<IQuickAnalytics>(GET_QUICK_ANALYTOCS);
}

export function useQuickAnalyticsSuspenseQuery() {
  return useSuspenseQuery<IQuickAnalytics>(GET_QUICK_ANALYTOCS);
}
