import { UserModel } from '../../../../shared';

export interface OnSaleMembershipModel {
  endDate?: Date;
  name: string;
  coverImage?: string;
  artist: UserModel;
  price: number;
  isOnWatchlist: boolean;
}
