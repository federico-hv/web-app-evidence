import { createContext, useContext } from 'react';
import { UserModel } from '../../../../shared';
import { FeedReactionName } from '../types';

interface IFeedContext {
  owner: UserModel;
  feedId: string;
  reaction: FeedReactionName | null;
  createdAt: string;
  isPinned: boolean;
  bookmarked: boolean;
}

const FeedContext = createContext<IFeedContext>({
  owner: { id: '', avatar: '', displayName: '', username: '' },
  feedId: '',
  reaction: null,
  bookmarked: false,
  createdAt: '',
  isPinned: false,
});

const FeedContextProvider = FeedContext.Provider;

function useFeedContext() {
  return useContext(FeedContext);
}

export { FeedContextProvider, useFeedContext };
