import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IDateValueCoordinate } from '../../../shared';
import { GET_MONTHLY_MEMBERSHIP_VALUES } from './schema';

export interface IMonthlyMembershipValuesResponse {
  monthlyMembershipValues: IDateValueCoordinate[];
}

export function useMonthlyMembershipValuesQuery() {
  return useQuery<IMonthlyMembershipValuesResponse>(
    GET_MONTHLY_MEMBERSHIP_VALUES,
  );
}

export function useMonthlyMembershipValuesSuspenseQuery() {
  return useSuspenseQuery<IMonthlyMembershipValuesResponse>(
    GET_MONTHLY_MEMBERSHIP_VALUES,
  );
}
