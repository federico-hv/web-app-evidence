import dayjs from 'dayjs';
import { AnalyticsSummaryData } from 'features';

export const dummyAnalyticsSummaryData: AnalyticsSummaryData = {
  clubViews: {
    value: 258,
    changePercentage: -4.2,
  },
  averageBidders: {
    value: 14,
    changePercentage: 5,
  },
  totalResales: {
    value: 24,
    changePercentage: 10,
  },
  socialInteractions: {
    value: 32,
    changePercentage: 8,
  },
  peakEngagementTime: new Date(),
};
