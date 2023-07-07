import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface DrawerButtonProps {
  icon: IconName;
  label: string;
  action?: VoidFunction;
}
