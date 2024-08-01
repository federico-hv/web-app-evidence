import { ITinyArtist, UserModel } from '../../../shared';
import { ITinyClub } from '../../clubs';

export interface IAuction {
  id: number;
  startsAt: Date;
  endsAt: Date;
  entryPrice: number;
  artist: ITinyArtist;
  club: ITinyClub;
  numberOfMemberships: number;
}

export interface CreateAuctionPayload {
  clubId: string;
  duration: number;
  entryPrice: number;
  numberOfMemberships: number;
}

export interface IUserBid {
  id: number;
  amount: number;
  createdAt: Date;
}

export interface IAuctionBid {
  owner: UserModel;
  artist: UserModel;
  bid: IUserBid;
  club: ITinyClub;
}

export interface ICreateBidArgs {
  id: number;
  amount: number;
}

export interface IUpdateBidArgs {
  id: number;
  amount: string;
}
