import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_SUMMARY } from './schema';
import { IClubSummary } from '../shared';

export function useClubSummaryQuery() {
  return useQuery<IClubSummary>(GET_CLUB_SUMMARY);
}

export function useClubSummarySuspenseQuery() {
  return useSuspenseQuery<IClubSummary>(GET_CLUB_SUMMARY);
}
