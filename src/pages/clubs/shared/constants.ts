import { Asset, UserModel } from '../../../shared';
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
  role: 'artist',
  avatar:
    'https://cdna.artstation.com/p/assets/images/images/071/001/504/smaller_square/icy-tamtam-asset.jpg?1704218440',
  displayName: 'Artist Name',
  username: 'artist username',
};

export const dummyMember: UserModel = {
  id: '1',
  role: 'artist',
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
  coverImage: Asset.Image.DummyMembershipCover,
};

export const dummyPerks = [
  'Early access to music',
  'Invite-only special events and performances',
  'Backstage Concert Passes',
];

export const dummySecondarySaleMembershipData: OnSaleMembershipModel = {
  price: 100.11,
  name: 'Name',
  artist: dummyArtist,
  isOnWatchlist: false,
  coverImage: Asset.Image.DummyMembershipCover,
};

export const dummyOwnedMembershipData: OwnedMembershipModel = {
  name: 'Rising Name',
  artist: dummyArtist,
  coverImage: Asset.Image.DummyMembershipCover,
};

export const dummyOwnedMembershipData2: OwnedMembershipModel = {
  name: 'Falling Name',
  artist: dummyArtist,
};
