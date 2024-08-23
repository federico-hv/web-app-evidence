import { StringNumeric } from '../../../../../shared';
import { ReactElement, ReactNode } from 'react';

export interface ValueStatisticProps {
  leftAddon?: ReactNode;
  description?: string;
  prefix?: string;
  suffix?: string;
  value: StringNumeric;
  label: string;
}
