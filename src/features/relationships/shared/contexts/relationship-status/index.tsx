import { createContext, useContext } from 'react';
import { GenericProps } from '../../../../../shared';
import { IRelationshipStatusInfo } from '../../interfaces';
import { useRelationshipStatusInfo } from '../../hooks';

const RelationshipStatusContext = createContext<IRelationshipStatusInfo>({
  isBlocked: false,
  isMuted: false,
  isFollower: false,
  isFollowing: false,
  isRestricted: false,
  hasFollowRequest: false,
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
