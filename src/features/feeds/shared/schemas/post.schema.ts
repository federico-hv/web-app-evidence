import { array, object, string } from 'yup';

const PollSchema = object({
  description: string().min(1).max(150).required(),
  responses: array().min(2).max(4).of(string().min(1).max(25)).required(),
});

const PostSchema = object({
  description: string().min(1).max(150).required(),
  media: array().of(object()).optional(),
});

export { PostSchema, PollSchema };
