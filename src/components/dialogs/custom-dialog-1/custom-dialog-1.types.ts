import { ReactNode } from 'react';

export interface CustomDialog1Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
}
