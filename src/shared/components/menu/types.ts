import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface MenuItemProps {
  label: string;
  icon: IconName;
  action?: VoidFunction;
  dangerous?: boolean;
}

export type SCNames =
  | 'MenuHeader'
  | 'MenuItem'
  | 'MenuContent'
  | 'MenuTrigger';
