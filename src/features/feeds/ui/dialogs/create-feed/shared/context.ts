import {
  CreateArticleInput,
  CreatePostInput,
  FeedAudienceEnum,
} from '../../../../shared';
import { ChangeEvent, createContext, useContext } from 'react';
import { dummyFn } from '../../../../../../shared';
import { defaultArticleState, defaultPostState } from './constants';
import { FeedWithType } from './types';

interface ICreateFeedContext {
  close: VoidFunction;

  badLink?: boolean;
  onBadLink: VoidFunction;
  onGoodLink: VoidFunction;

  websiteUrl: string;
  resetWebsiteUrl: VoidFunction;
  handleOnWebsiteChange: (
    e: ChangeEvent<HTMLInputElement>,
    cb?: VoidFunction,
  ) => void;

  postState: CreatePostInput;
  updatePostState: (next: Partial<CreateArticleInput>) => void;

  articleState: CreateArticleInput;
  updateArticleState: (next: Partial<CreateArticleInput>) => void;

  type?: FeedWithType;
  toggleType: (next: FeedWithType) => void;

  audience: FeedAudienceEnum;
  setAudience: (audience: FeedAudienceEnum) => void;
}

const CreateFeedContext = createContext<ICreateFeedContext>({
  close: dummyFn,

  badLink: false,
  onBadLink: dummyFn,
  onGoodLink: dummyFn,

  websiteUrl: '',
  handleOnWebsiteChange: dummyFn,
  resetWebsiteUrl: dummyFn,

  audience: FeedAudienceEnum.Everyone,
  setAudience: (audience: FeedAudienceEnum) => console.log(audience),

  articleState: defaultArticleState,
  updateArticleState: dummyFn,

  postState: defaultPostState,
  updatePostState: dummyFn,

  toggleType: dummyFn,
  type: undefined,
});

const CreateFeedContextProvider = CreateFeedContext.Provider;

function useCreateFeedContext() {
  return useContext(CreateFeedContext);
}

export { useCreateFeedContext, CreateFeedContextProvider };
