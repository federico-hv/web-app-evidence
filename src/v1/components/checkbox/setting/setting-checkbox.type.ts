import { ReactEventHandler } from 'react';

export interface SettingCheckboxProp {
  heading: string;
  subheading?: string;
  disabled?: boolean;
  value?: boolean;
  onChange?: ReactEventHandler;
}
