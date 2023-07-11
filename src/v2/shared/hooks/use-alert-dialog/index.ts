import { useContext, useEffect } from 'react';
import {
  AlertDialogContext,
  AlertDialogContextState,
} from '../../contexts';

export function useAlertDialog(state: AlertDialogContextState) {
  const { set, onClose, onOpen, isOpen } = useContext(AlertDialogContext);

  useEffect(() => {
    if (isOpen && set) set(state);
  }, [isOpen, set]);

  return { open: onOpen, close: onClose };
}
