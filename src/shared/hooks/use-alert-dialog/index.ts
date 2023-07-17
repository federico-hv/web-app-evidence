import { useContext } from 'react';
import {
  AlertDialogContext,
  AlertDialogContextState,
} from '../../contexts';

export function useAlertDialog() {
  const { set, onClose, onOpen } = useContext(AlertDialogContext);

  const openWith = (state: AlertDialogContextState) => {
    set(state);
    onOpen();
  };

  return { onOpen, onClose, set, openWith };
}
