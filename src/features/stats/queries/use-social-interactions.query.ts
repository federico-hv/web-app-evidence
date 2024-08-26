import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IStringNumberCoordinate } from '../../../shared';
import { GET_SOCIAL_INTERACTIONS } from './schema';
import { TimePeriodEnum } from '../shared';

export interface ISocialInteractionsResponse {
  monthlySocialInteractions: IStringNumberCoordinate[];
}

export interface ISocialInteractionArgs {
  period?: TimePeriodEnum;
}

export function useSocialInteractionQuery(period?: TimePeriodEnum) {
  return useQuery<ISocialInteractionsResponse, ISocialInteractionArgs>(
    GET_SOCIAL_INTERACTIONS,
    { variables: { period } },
  );
}

export function useSocialInteractionSuspenseQuery(
  period?: TimePeriodEnum,
) {
  return useSuspenseQuery<
    ISocialInteractionsResponse,
    ISocialInteractionArgs
  >(GET_SOCIAL_INTERACTIONS, { variables: { period } });
}
