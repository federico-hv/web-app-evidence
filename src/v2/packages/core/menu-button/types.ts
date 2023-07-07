import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface MenuButtonProps {
  label: string;
  icon: IconName;
  dangerous?: boolean;
  onClick?: VoidFunction;
}
