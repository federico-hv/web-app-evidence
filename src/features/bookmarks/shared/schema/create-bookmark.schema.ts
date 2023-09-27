import { boolean, object, string } from 'yup';
import { ICreateBookmarkGroup } from '../interface';
import {
  maximumLengthMsg,
  minimumLengthMsg,
  requiredField,
} from '../../../../shared';

export const CreateBookmarkSchema = object<ICreateBookmarkGroup>({
  name: string()
    .min(1, minimumLengthMsg(1))
    .max(60, maximumLengthMsg(60))
    .required(requiredField('name')),
  isPrivate: boolean().optional().default(true),
});
