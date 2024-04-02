import { StringNumeric } from 'shared';

export interface AnalyticsStatisticProps {
  label: string;
  value: StringNumeric;
  percent?: number;
  description?: string;
  suffix?: string;
}
