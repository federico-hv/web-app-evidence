import { ITinyArtist } from '../../../shared';
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
