import { UserModel } from '../../../../shared';
import { IArtist } from '../../../artist';

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
  coverImage?: string;
  artist: UserModel;
}

export interface MembershipValueData {
  averagePrice: number;
  priceChange: number;
  membershipsSold: number;
  numOfMemberships: number;
}

export interface IPerk {
  id: number;
  label: string;
  description?: string;
}

export interface IClub {
  id: string;
  coverImage?: string;
  bannerImage?: string;
  url?: string;
  createdAt: Date;
  artist: IArtist;
}
