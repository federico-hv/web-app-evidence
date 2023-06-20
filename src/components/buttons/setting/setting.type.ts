import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface SettingsButtonProp {
  path: string;
  icon?: IconName;
  heading: string;
  subheading?: string;
  capitalize?: { subheading?: boolean; heading?: boolean };
}
