import { UserModel } from '../../../shared';
import { OnSaleMembershipModel } from '../../../features';

export const TabOptions = {
  all: 'all',
  'live-auctions': 'live-auctions',
  'secondary-sales': 'secondary-sales',
  watchlist: 'watchlist',
};

// TODO remove whne we have real data
export const dummyArtist: UserModel = {
  id: '1',
  avatar: '',
  displayName: 'Artist Name',
  username: 'artist username',
};

export const dummyAuctionMembershipData: OnSaleMembershipModel = {
  isLive: true,
  isOnWatchlist: false,
  price: 100.11,
  name: 'Name',
  artist: dummyArtist,
};

export const dummySecondarySaleMembershipData: OnSaleMembershipModel = {
  price: 100.11,
  name: 'Name',
  artist: dummyArtist,
  isOnWatchlist: false,
};
