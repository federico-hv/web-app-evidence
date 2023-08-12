import { useContext } from 'react';
import { GeneralContext } from '../../contexts';

export function useGeneralContext() {
  return useContext(GeneralContext);
}
