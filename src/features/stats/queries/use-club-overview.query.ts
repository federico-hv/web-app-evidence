import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_OVERVIEW } from './schema';
import { IClubSummary } from '../shared';

interface ClubSummaryResponse {
  clubOverview: IClubSummary;
}

export function useClubOverviewQuery() {
  return useQuery<ClubSummaryResponse>(GET_CLUB_OVERVIEW);
}

export function useClubOverviewSuspenseQuery() {
  return useSuspenseQuery<ClubSummaryResponse>(GET_CLUB_OVERVIEW);
}
