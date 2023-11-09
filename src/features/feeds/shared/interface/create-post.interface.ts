interface CreatePoll {
  description: string;
  endDate?: Date;
  responses?: string[];
  media?: never;
  hashtags?: string[];
  mentions?: string[];
}

interface CreatePost {
  description: string;
  endDate?: never;
  media?: { file: File }[];
  responses?: never;
  hashtags?: string[];
  mentions?: string[];
}

type CreatePostInput = CreatePost | CreatePoll;

export type { CreatePostInput };
