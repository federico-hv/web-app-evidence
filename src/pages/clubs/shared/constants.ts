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

export const dummyMember: UserModel = {
  id: '1',
  avatar: 'https://cdna.artstation.com/p/assets/images/images/071/001/504/smaller_square/icy-tamtam-asset.jpg?1704218440',
  displayName: 'Member Name',
  username: 'member_username',
};

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const dummyAuctionMembershipData: OnSaleMembershipModel = {
  endDate: tomorrow,
  isOnWatchlist: false,
  price: 100.11,
  name: 'Name',
  artist: dummyArtist,
};

export const dummySecondarySaleMembershipData: OnSaleMembershipModel = {
  price: 100.11,
  name: 'Name Secondary',
  artist: dummyArtist,
  isOnWatchlist: false,
};