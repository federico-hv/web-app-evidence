import { UserModel } from '../../../shared';
import {
  OnSaleMembershipModel,
  OwnedMembershipModel,
} from '../../../features';

export const TabOptions = {
  all: 'all',
  'live-auctions': 'live-auctions',
  'secondary-sales': 'secondary-sales',
  watchlist: 'watchlist',
};

// TODO remove whne we have real data
export const dummyArtist: UserModel = {
  id: '1',
  avatar: 'https://cdna.artstation.com/p/assets/images/images/071/001/504/smaller_square/icy-tamtam-asset.jpg?1704218440',
  displayName: 'Artist Name',
  username: 'artist username',
};

export const dummyMember: UserModel = {
  id: '1',
  avatar: 'https://cdn.discordapp.com/attachments/824040811926519879/1207812411650736168/Untitled3448_20240215141502.png?ex=65e101f7&is=65ce8cf7&hm=52c23d9358adb9492da6194b8766aa686835f1056ed9ab185d35af641b3cc603&',
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

export const dummyOwnedMembershipData: OwnedMembershipModel = {
  salePrice: 200,
  name: 'Rising Name',
  artist: dummyArtist,
  membershipNum: 3,
  priceChange: 42,
  priceHasRisen: true
};

export const dummyOwnedMembershipData2: OwnedMembershipModel = {
  salePrice: 200,
  name: 'Falling Name',
  artist: dummyArtist,
  membershipNum: 3,
  priceChange: 42,
};
