import { IconName } from '@holdr-ui/react/dist/shared/types';
import { ReactNode } from 'react';

export interface MenuItemProps {
  label?: string;
  icon?: JSX.Element | IconName;
  action?: VoidFunction;
  dangerous?: boolean;
  children?: ReactNode;
}

export type SCNames =
  | 'MenuHeader'
  | 'MenuItem'
  | 'MenuContent'
  | 'MenuTrigger';
