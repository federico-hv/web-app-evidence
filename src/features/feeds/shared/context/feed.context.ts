import { createContext, useContext } from 'react';
import { UserModel } from '../../../../shared';

interface IFeedContext {
  owner: UserModel;
  feedId: string;
  createdAt: string;
  isPinned: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
}

const FeedContext = createContext<IFeedContext>({
  owner: {
    id: '',
    avatar: '',
    displayName: '',
    username: '',
    role: 'general',
  },
  feedId: '',
  isLiked: false,
  isBookmarked: false,
  createdAt: '',
  isPinned: false,
});

const FeedContextProvider = FeedContext.Provider;

function useFeedContext() {
  return useContext(FeedContext);
}

export { FeedContextProvider, useFeedContext };
