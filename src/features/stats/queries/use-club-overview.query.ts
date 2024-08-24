import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_SUMMARY } from './schema';
import { IClubSummary } from '../shared';

interface ClubSummaryResponse {
  clubOverview: IClubSummary;
}

export function useClubOverviewQuery() {
  return useQuery<ClubSummaryResponse>(GET_CLUB_SUMMARY);
}

export function useClubOverviewSuspenseQuery() {
  return useSuspenseQuery<ClubSummaryResponse>(GET_CLUB_SUMMARY);
}
