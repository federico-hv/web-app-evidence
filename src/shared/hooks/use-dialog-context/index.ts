import { useContext } from 'react';
import { DialogContext } from '../../contexts';

export function useDialogContext() {
  return useContext(DialogContext);
}
