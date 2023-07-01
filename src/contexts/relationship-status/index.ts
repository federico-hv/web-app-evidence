import { createContext } from 'react';
import { RelationshipStatusInfo } from '../../lib';

const RelationshipStatusContext = createContext<RelationshipStatusInfo>({
  isBlocked: false,
  isMuted: false,
  isFollower: false,
  isFollowing: false,
  isFriend: false,
  isFavourite: false,
  isOwned: false,
});

const RelationshipStatusContextProvider =
  RelationshipStatusContext.Provider;

export { RelationshipStatusContext, RelationshipStatusContextProvider };
