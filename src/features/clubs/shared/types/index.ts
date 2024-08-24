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
  description: string;
}

export interface IClub {
  id: string;
  name: string;
  coverImage?: string;
  bannerImage?: string;
  url?: string;
  createdAt: Date;
}

export interface BidData {
  displayName: string;
  createdAt: Date;
  amount: number;
  bidId: number;
}

export interface ITinyClub {
  id: string;
  url?: string;
  name: string;
  coverImage: string;
  perks: IPerk[];
}
