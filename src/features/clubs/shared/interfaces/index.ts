import { UserModel } from '../../../../shared';

export interface OnSaleMembershipModel {
  endDate?: Date;
  name: string;
  coverImage: string;
  artist: UserModel;
  price: number;
  isOnWatchlist: boolean;
}

export interface OwnedMembershipModel {
  name: string;
  coverImage?: string;
  artist: UserModel;
}

export interface IPerk {
  id: number;
  label: string;
  description?: string;
  additionalInfo?: string;
}

export interface IClub {
  id: string;
  coverImage?: string;
  bannerImage?: string;
  url?: string;
  createdAt: Date;
}

export interface BidderModel {
  displayName: string;
  createdAt: Date;
  amount: number;
}
