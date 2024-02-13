import { UserModel } from '../../../../shared';

export interface OnSaleMembershipModel {
  isLive?: boolean;
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
}
