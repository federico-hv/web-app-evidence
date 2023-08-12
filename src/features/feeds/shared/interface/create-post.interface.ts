interface CreatePoll {
  description: string;
  endDate?: Date;
  responses?: string[];
  media?: never;
}

interface CreatePost {
  description: string;
  endDate?: never;
  media?: { file: File }[];
  responses?: never;
}

type CreatePostInput = CreatePost | CreatePoll;

export type { CreatePostInput };
