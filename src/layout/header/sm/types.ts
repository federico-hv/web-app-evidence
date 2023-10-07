import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface ProfileDrawerOptionProps {
  onClick?: VoidFunction;
  to?: string;
  label: string;
  icon: IconName;
}
