import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_PAST_TRANSACTIONS } from './schema';
import { IConnection, IPaginationParams } from '../../../shared';
import { IPaymentTransaction } from '../shared';

export function usePastTransactionsQuery() {
  return useQuery<
    { pastTransactions: IConnection<IPaymentTransaction, number> },
    { params?: IPaginationParams<number> }
  >(GET_PAST_TRANSACTIONS);
}

export function usePastTransactionsSuspenseQuery() {
  return useSuspenseQuery<
    { pastTransactions: IConnection<IPaymentTransaction, number> },
    { params?: IPaginationParams<number> }
  >(GET_PAST_TRANSACTIONS);
}
