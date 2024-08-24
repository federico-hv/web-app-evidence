import { Dispatch, SetStateAction } from 'react';

export interface AlertDialogContextState {
  title: string;
  description: string;
  actionText: string;
  cancelText?: string;
  onAction?: VoidFunction;
  onCancel?: VoidFunction;
  loadingText?: string;
  isLoading?: boolean;
}

export interface IAlertDialogContext {
  current: AlertDialogContextState | undefined;
  set: Dispatch<SetStateAction<AlertDialogContextState | undefined>>;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  isOpen: boolean;
}
