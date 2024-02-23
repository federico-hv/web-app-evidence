import { object, string } from 'yup';
import {
  maximumLengthMsg,
  minimumLengthMsg,
  requiredField,
} from '../../../../../../shared';

export const MaxArticleTitle = 125;
export const MaxArticleDescription = 175;

export const ArticleSchema = object({
  title: string()
    .required(requiredField('title', 'A title is required.'))
    .min(1, minimumLengthMsg(1))
    .max(MaxArticleTitle, maximumLengthMsg(MaxArticleTitle)),

  url: string()
    .required(requiredField('url', 'A url is required.'))
    .url('A valid URL is required.')
    .min(1, minimumLengthMsg(1)),

  imageUrl: string()
    .required(requiredField('imageUrl', 'An image url is required.'))
    .url('A valid URL is required.')
    .min(1, minimumLengthMsg(1)),

  description: string()
    .required(requiredField('description', 'A description is required.'))
    .min(1, minimumLengthMsg(1))
    .max(MaxArticleDescription, maximumLengthMsg(MaxArticleDescription)),
});
