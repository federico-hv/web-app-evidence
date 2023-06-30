import { useContext } from 'react';
import { AlertDialogContext } from '../../contexts';

export function useAlertDialog() {
  const { set, onClose, onOpen, isOpen } = useContext(AlertDialogContext);

  return { open: onOpen, close: onClose, set, isOpen };
}
