import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CONTENDERS } from '../../queries';
import { IAuctionBid } from '../types';
import { IConnection, IPaginationParams } from '../../../../shared';

export enum ContenderFilterEnum {
  'Active' = 'Active',
  'Inactive' = 'Inactive',
}

export interface IContendersArgs {
  id: number;
  filter?: ContenderFilterEnum;
  params?: IPaginationParams<number>;
}

export function useGetContendersQuery(args: IContendersArgs) {
  return useQuery<
    { contenders: IConnection<IAuctionBid, string> },
    IContendersArgs
  >(GET_CONTENDERS, {
    variables: args,
    pollInterval: 1,
  });
}

export function useGetContendersSuspenseQuery(args: IContendersArgs) {
  return useSuspenseQuery<
    { contenders: IConnection<IAuctionBid, string> },
    IContendersArgs
  >(GET_CONTENDERS, {
    variables: args,
  });
}
