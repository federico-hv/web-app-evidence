import { createContext, useContext } from 'react';
import { GenericProps } from '../../../../../shared';
import { RelationshipStatusInfo } from '../../interfaces';
import { useRelationshipStatusInfo } from '../../hooks';

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

function useRelationshipStatus() {
  return useContext(RelationshipStatusContext);
}

function RelationshipProvider({
  children,
  username = '',
}: GenericProps & { username: string }) {
  const { data } = useRelationshipStatusInfo(username);

  return (
    <RelationshipStatusContextProvider value={data.relationshipStatusInfo}>
      {children}
    </RelationshipStatusContextProvider>
  );
}

export {
  RelationshipStatusContext,
  RelationshipStatusContextProvider,
  RelationshipProvider,
  useRelationshipStatus,
};
