import { UserModel } from '../../../shared';
import {
  OnSaleMembershipModel,
  OwnedMembershipModel,
} from '../../../features';
import dayjs from 'dayjs';

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
  avatar:
    'https://cdna.artstation.com/p/assets/images/images/071/001/504/smaller_square/icy-tamtam-asset.jpg?1704218440',
  displayName: 'Member Name',
  username: 'member_username',
};

export const dummyAuctionMembershipData: OnSaleMembershipModel = {
  endDate: dayjs().add(1, 'day').toDate(),
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
