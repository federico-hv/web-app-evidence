import { useContext } from 'react';
import { GeneralContext } from '../../contexts';

export function useGeneralContext<T>(): {
  state: T;
  update: (next?: Partial<T>) => void;
} {
  return useContext(GeneralContext);
}
