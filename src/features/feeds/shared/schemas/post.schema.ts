import { array, object, string } from 'yup';

const PollSchema = object({
  description: string().min(1).max(150).required(),
  responses: array().of(string().min(1).max(25)).required(),
});

const PostSchema = object({
  description: string().min(1).max(150).required(),
});

export { PostSchema, PollSchema };
