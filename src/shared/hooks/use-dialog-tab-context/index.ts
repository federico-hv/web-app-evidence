import { useContext } from 'react';
import { DialogTabContext } from '../../contexts';

export function useDialogTabContext() {
  return useContext(DialogTabContext);
}
