import { OnSaleMembershipModel } from 'features/clubs/shared';
import { UserModel } from 'shared';
import dayjs from 'dayjs';

export const dummyArtist: UserModel = {
  id: '1',
  avatar:
    'https://cdna.artstation.com/p/assets/images/images/071/001/504/smaller_square/icy-tamtam-asset.jpg?1704218440',
  displayName: 'Artist Name',
  username: 'artist username',
  role: 'general',
};
export const dummyAuctionMembershipData: OnSaleMembershipModel = {
  endDate: dayjs().add(1, 'day').toDate(),
  isOnWatchlist: false,
  price: 100.11,
  name: 'Name',
  artist: dummyArtist,
  coverImage: '',
};

export const dummySecondarySaleMembershipData: OnSaleMembershipModel = {
  price: 100.11,
  name: 'Name',
  artist: dummyArtist,
  isOnWatchlist: false,
  coverImage: '',
};
