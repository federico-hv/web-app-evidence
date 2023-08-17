import { createContext, useContext } from 'react';
import { UserModel } from '../../../../shared';
import { IReaction } from '../interface';

interface IFeedContext {
  owner: UserModel;
  feedId: string;
  reaction: IReaction | null;
  createdAt: string;
}

const FeedContext = createContext<IFeedContext>({
  owner: { id: '', avatar: '', displayName: '', username: '' },
  feedId: '',
  reaction: null,
  createdAt: '',
});

const FeedContextProvider = FeedContext.Provider;

function useFeedContext() {
  return useContext(FeedContext);
}

export { FeedContextProvider, useFeedContext };
