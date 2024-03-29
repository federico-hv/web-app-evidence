import dayjs from "dayjs";
import { AnalyticsSummaryData } from "features";

export const dummyAnalyticsSummaryData: AnalyticsSummaryData = {
    clubViews: {
        value: 0,
        changePercentage: 0
    },

    averageBidders: {
        value: 0,
        changePercentage: 0
    },
    totalResales: {
        value: 0,
        changePercentage: 0
    },
    socialInteractions: {
        value: 0,
        changePercentage: 0
    },
    peakEngagementTime: new Date()
}