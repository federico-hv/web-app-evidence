import { useQuery } from '@apollo/client';
import { GET_ALL_CLUBS } from '../../../../../features/clubs/queries';
import { IPerk } from 'features';

export interface Club {
  id: string;
  name: string;
  followers: number;
  following: number;
  coverImage: string;
  perks: IPerk[];
}

export interface ClubsEdge {
  node: Club;
}

export interface ClubsData {
  clubs: {
    edges: ClubsEdge[];
  };
}

export function useGetAllClubs() {
  return useQuery<ClubsData>(GET_ALL_CLUBS);
}
