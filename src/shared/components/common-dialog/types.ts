import { ReactNode } from 'react';
import { StringNumeric } from '../../types';

export type CommonDialogSCNames =
  | 'CommonDialogHeader'
  | 'CommonDialogContent'
  | 'CommonDialogActionButton'
  | 'CommonDialogTrigger'
  | 'CommonDialogInfoItem';

export interface CommonDialogProps {
  ariaDescribedBy?: string;
  minHeight?: StringNumeric;
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
