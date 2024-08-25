import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IStringNumberCoordinate } from '../../../shared';
import { GET_VISITS_BY_COUNTRY } from './schema';

export interface IVisitsByCountryResponse {
  visitsByCountry: IStringNumberCoordinate[];
}

export function useVisitsByCountryQuery() {
  return useQuery<IVisitsByCountryResponse>(GET_VISITS_BY_COUNTRY);
}

export function useVisitsByCountrySuspenseQuery() {
  return useSuspenseQuery<IVisitsByCountryResponse>(GET_VISITS_BY_COUNTRY);
}
