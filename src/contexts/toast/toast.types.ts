import { Dispatch, SetStateAction } from 'react';
import { AlertStatus } from '@holdr-ui/react/dist/compositions/alert/src/alert.types';

export interface ToastContextState {
  description: string;
  status?: AlertStatus;
}

export interface IToastContext {
  current: ToastContextState | undefined;
  set?: Dispatch<SetStateAction<ToastContextState | undefined>>;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  isOpen: boolean;
}
