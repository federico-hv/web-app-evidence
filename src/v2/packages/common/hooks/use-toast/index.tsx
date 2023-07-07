import { ToastContext, ToastContextState } from '../../contexts';
import { useContext, useEffect } from 'react';

/**
 * Hook that returns methods to show and close a toast dialog.
 *
 * @param state an object containing:
 * - description: The text to be shown in the toast dialog
 * - status: The status of the toast dialog
 */
export function useToast(state: ToastContextState) {
  const { set, isOpen, onOpen, onClose } = useContext(ToastContext);

  useEffect(() => {
    if (isOpen && set) set(state);
  }, [isOpen, state, set]);

  return { open: onOpen, close: onClose, set };
}
