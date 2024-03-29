export interface ProfileFormData {
  displayName: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
}

export interface UpdateProfilePayload {
  payload: ProfileFormData;
}

interface Statistic {
  value: number;
  changePercentage: number;
}

export interface AnalyticsSummaryData {
  clubViews: Statistic;
  totalResales: Statistic;
  conversionRate: Statistic;
  socialInteractions: Statistic;
  peakEngagementTime: Date;
}
