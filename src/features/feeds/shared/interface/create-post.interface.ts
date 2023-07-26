interface CreatePostWithPolls {
  description: string;
  responses?: string[];
}

interface CreatePostWithoutPolls {
  description: string;
  responses?: never;
}

type CreatePostInput = CreatePostWithoutPolls | CreatePostWithPolls;

export type { CreatePostInput };
