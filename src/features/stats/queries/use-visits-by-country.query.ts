import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IStringNumberCoordinate } from '../../../shared';
import { GET_VISITS_BY_COUNTRY } from './schema';
import { TimePeriodEnum } from '../shared';

export interface IVisitsByCountryResponse {
  visitsByCountry: IStringNumberCoordinate[];
}

export interface IVisitsByCountryArgs {
  period?: TimePeriodEnum;
}

export function useVisitsByCountryQuery(period?: TimePeriodEnum) {
  return useQuery<IVisitsByCountryResponse, IVisitsByCountryArgs>(
    GET_VISITS_BY_COUNTRY,
    { variables: { period } },
  );
}

export function useVisitsByCountrySuspenseQuery(period?: TimePeriodEnum) {
  return useSuspenseQuery<IVisitsByCountryResponse, IVisitsByCountryArgs>(
    GET_VISITS_BY_COUNTRY,
    { variables: { period } },
  );
}
