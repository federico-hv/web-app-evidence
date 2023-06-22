import { ReactNode } from 'react';

export interface ChangeContactInfoDialogProps {
  name: string;
  onOpen: VoidFunction;
  isOpen: boolean;
  value: string;
  onClose: VoidFunction;
  children: ReactNode;
}

export interface ChangeContactInfoDialogSupportProps {
  name: string;
  value?: string;
}
