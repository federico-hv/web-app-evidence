import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_ANALYTICS } from './schema';
import { IClubSummary } from '../shared';

export interface IClubAnalyticsResponse {
  clubSummary: IClubSummary;
  socialSummary: { peakEngagementTime: string };
}

export function useClubAnalyticsQuery() {
  return useQuery<IClubAnalyticsResponse>(GET_CLUB_ANALYTICS);
}

export function useClubAnalyticsSuspenseQuery() {
  return useSuspenseQuery<IClubAnalyticsResponse>(GET_CLUB_ANALYTICS);
}
