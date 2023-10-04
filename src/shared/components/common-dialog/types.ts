import { ReactNode } from 'react';

export type CommonDialogSCNames =
  | 'CommonDialogHeader'
  | 'CommonDialogContent'
  | 'CommonDialogActionButton'
  | 'CommonDialogTrigger'
  | 'CommonDialogInfoItem';

export interface CommonDialogProps {
  ariaDescribedBy?: string;
  minHeight?: number;
  children?: ReactNode;
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

export interface CommonDialogActionButtonProps {
  label: string;
  disabled?: boolean;
  onClick: VoidFunction;
  loading?: boolean;
  loadingText?: string;
}
