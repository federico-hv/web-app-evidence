export interface IFraction {
  numerator: number;
  denominator: number;
}

export interface IStatisticValue {
  value: number;
  percentage: number;
}

export interface IClubSummary {
  averagePrice: IStatisticValue;
  lastSale: IStatisticValue;
  clubViews: IStatisticValue;
  averageBidders: IStatisticValue;
  membersCount: IFraction;
  membershipCount: IFraction;
}
