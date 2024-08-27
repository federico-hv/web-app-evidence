import { FeedAudienceEnum } from '../enum';

interface CreatePoll {
  description: string;
  endDate?: Date;
  responses?: string[];
  media?: never;
  hashtags?: string[];
  mentions?: string[];
  length?: number;
}

interface CreatePost {
  description: string;
  endDate?: never;
  media?: { file: File }[];
  responses?: never;
  hashtags?: string[];
  mentions?: string[];
  length?: number;
}

type CreatePostInput = (CreatePost | CreatePoll) & {
  audience?: FeedAudienceEnum;
};

export type { CreatePostInput };
