import { object, string } from 'yup';

const ArticleSchema = object({
  title: string().max(50),
  name: string().max(50),
  url: string().url('Enter valid url.'),
  image: string().url('Enter valid url.'),
  description: string().max(140),
});

export { ArticleSchema };
