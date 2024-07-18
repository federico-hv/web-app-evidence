import { OperationVariables, useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { QueryGuardProps } from './types';
import { Loader } from '../index';
import { CircularProgress } from '@holdr-ui/react';

/**
 *
 */

function QueryGuard<
  T extends { [key: string]: boolean },
  U extends OperationVariables,
>({
  query,
  args,
  name,
  children,
  loader = <CircularProgress size={30} isIndeterminate />,
  fallback = <Fragment />,
}: QueryGuardProps<U>) {
  const { data, error, loading } = useQuery<T, U>(query, {
    variables: args,
  });

  if (error) {
    return fallback;
  }

  return (
    <Loader as={loader} h='100%' loading={loading}>
      {data && !data[name] ? children : fallback}
    </Loader>
  );
}
QueryGuard.displayName = 'QueryGuard';

export default QueryGuard;
