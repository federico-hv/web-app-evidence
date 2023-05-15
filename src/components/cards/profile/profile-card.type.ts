import { IUserSm } from 'shared';
import { ReactNode } from 'react';

export interface ProfileCardProps {
  currentUser: IUserSm;
}

export interface ActionWrapperProps {
  children: ReactNode;
}
