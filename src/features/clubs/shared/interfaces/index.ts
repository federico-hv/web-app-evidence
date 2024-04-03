import { UserModel } from '../../../../shared';

export interface OnSaleMembershipModel {
  endDate?: Date;
  name: string;
  coverImage?: string;
  artist: UserModel;
  price: number;
  isOnWatchlist: boolean;
}

export interface OwnedMembershipModel {
  name: string;
  salePrice: number;
  artist: UserModel;
  membershipNum: number;
  priceChange: number;
  priceHasRisen?: boolean;
}

export interface MembershipValueData {
  averagePrice: number;
  priceChange: number;
  membershipsSold: number;
  numOfMemberships: number;
}
