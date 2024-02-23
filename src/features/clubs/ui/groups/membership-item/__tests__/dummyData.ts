import { OwnedMembershipModel } from 'features/clubs/shared';
import { UserModel } from 'shared';

export const dummyArtist: UserModel = {
  id: '1',
  avatar:
    'https://cdna.artstation.com/p/assets/images/images/071/001/504/smaller_square/icy-tamtam-asset.jpg?1704218440',
  displayName: 'Artist Name',
  username: 'artist username',
};

export const dummyOwnedMembershipData: OwnedMembershipModel = {
  salePrice: 200,
  name: 'Rising Name',
  artist: dummyArtist,
  membershipNum: 3,
  priceChange: 42,
  priceHasRisen: true,
};

export const dummyOwnedMembershipData2: OwnedMembershipModel = {
  salePrice: 200,
  name: 'Falling Name',
  artist: dummyArtist,
  membershipNum: 3,
  priceChange: 42,
};
