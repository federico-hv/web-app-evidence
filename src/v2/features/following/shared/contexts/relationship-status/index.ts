import { createContext } from 'react';
import { RelationshipStatusInfo } from '../../interfaces';

const RelationshipStatusContext = createContext<RelationshipStatusInfo>({
  isBlocked: false,
  isMuted: false,
  isFollower: false,
  isFollowing: false,
  isFriend: false,
  isRestricted: false,
  isFavourite: false,
  isOwned: false,
  hasFollowRequest: false,
  hasFriendRequest: false,
});

const RelationshipStatusContextProvider =
  RelationshipStatusContext.Provider;

export { RelationshipStatusContext, RelationshipStatusContextProvider };
