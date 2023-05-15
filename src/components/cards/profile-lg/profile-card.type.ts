import { IUserSm } from 'shared';
import { ReactNode } from 'react';

export interface ProfileCardProps {
  currentUser: IUserSm;
  onClose?: VoidFunction;
}

export interface ActionWrapperProps {
  children: ReactNode;
  onClick?: VoidFunction;
}
