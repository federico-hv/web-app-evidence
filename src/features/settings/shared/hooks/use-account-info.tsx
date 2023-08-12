import { useContext } from 'react';
import { AccountInfoContext } from '../contexts';

export function useAccountInfo() {
  return useContext(AccountInfoContext);
}
