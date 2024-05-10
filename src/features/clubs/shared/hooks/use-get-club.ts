import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB } from '../../queries';
import { IClub } from '../interfaces';

export interface IGetProfileSetupInfoOptions {
  artistId?: string;
  id?: string;
  accountId?: string;
}

export function useGetClub(options: IGetProfileSetupInfoOptions) {
  return useQuery<{ club: IClub }, IGetProfileSetupInfoOptions>(GET_CLUB, {
    variables: options,
  });
}
export function useSuspenseGetClub(options: IGetProfileSetupInfoOptions) {
  return useSuspenseQuery<{ club: IClub }, IGetProfileSetupInfoOptions>(
    GET_CLUB,
    { variables: options },
  );
}
