export interface IMembershipCount {
  sold: number;
  remaining: number;
}

export interface IClubSummary {
  averagePrice: number;
  lastSale: number;
  membershipCount: IMembershipCount;
}
