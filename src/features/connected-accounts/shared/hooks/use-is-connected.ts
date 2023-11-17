import { ConnectorProvider } from '../types';
import { useConnectedAccounts } from './use-connected-accounts';

/**
 * Determine whether a user has at least 1 connected account found in the names list.
 *
 * @param names the social provider names
 * @param atLeast the number of connected accounts expected to be found
 */
export function useIsConnected(names: ConnectorProvider[], atLeast = 1) {
  const connectedAccounts = useConnectedAccounts(names);

  return connectedAccounts.edges.length >= atLeast;
}
