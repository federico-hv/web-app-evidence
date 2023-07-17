import { useContext } from 'react';
import { AuthContext } from './context';

/**
 *
 */
export function useCurrentUser() {
  const { currentUser } = useContext(AuthContext);

  return currentUser;
}
