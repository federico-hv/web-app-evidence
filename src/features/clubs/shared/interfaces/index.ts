import { UserModel } from '../../../../shared';

export interface OnSaleMembershipModel {
  endDate?: boolean;
  name: string;
  coverImage?: string;
  artist: UserModel;
  price: number;
  isOnWatchlist: boolean;
}
