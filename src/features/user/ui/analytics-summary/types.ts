import { AnalyticsSummaryData } from 'features/user/shared';
import { StringNumeric } from 'shared';

export interface AnalyticsSummaryProps {
  data: AnalyticsSummaryData;
}

export interface AnalyticsStatisticProps {
  label: string;
  value: StringNumeric;
  percent?: number;
  description?: string;
  suffix?: string;
}
