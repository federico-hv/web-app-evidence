import { ToastContext, ToastContextState } from '../../contexts';
import { useContext } from 'react';

export function useToast() {
  const { set, onOpen, onClose } = useContext(ToastContext);

  const openWith = (state: ToastContextState) => {
    if (set) {
      set(state);
      onOpen();
    }
  };

  return { open: onOpen, close: onClose, set, openWith };
}
