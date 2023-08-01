interface CreatePoll {
  description: string;
  responses?: string[];
  media?: never;
}

interface CreatePost {
  description: string;
  media?: { file: File }[];
  responses?: never;
}

type CreatePostInput = CreatePost | CreatePoll;

export type { CreatePostInput };
