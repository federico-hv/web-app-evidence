import { ITinyMembership } from '../../memberships';
import { ITinyPaymentTransaction } from '../../payment-methods';
import { IUser, UserModel } from '../../../shared';

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
  milestones: IFraction;
  membershipCount: IFraction;
}

export interface IExpandedClubMember {
  id: number; // paymentOnMembership ID
  user: IUser;
  membership: ITinyMembership;
  payment: ITinyPaymentTransaction;
}
