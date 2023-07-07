import { useContext } from 'react';
import { AuthContext } from '../../contexts';

export function useAuthContext() {
  return useContext(AuthContext);
}
