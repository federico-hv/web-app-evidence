import { object, string } from 'yup';
import {
  maximumLengthMsg,
  minimumLengthMsg,
  requiredField,
} from '../../../../shared';

const ArticleSchema = object({
  title: string()
    .max(50, maximumLengthMsg(50))
    .min(1, minimumLengthMsg(1))
    .required(requiredField('article title', 'an')),
  url: string()
    .url('Enter valid url.')
    .required(requiredField('website URL', 'a')),
  image: string()
    .url('Enter valid url.')
    .required(requiredField('article image', 'an')),
  description: string()
    .max(140, maximumLengthMsg(140))
    .min(1, minimumLengthMsg(1))
    .required(requiredField('article descrption', 'a')),
});

export { ArticleSchema };
