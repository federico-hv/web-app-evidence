import { object, string } from 'yup';
import { IUpdateBookmarkGroup } from '../interface';
import {
  maximumLengthMsg,
  minimumLengthMsg,
  requiredField,
} from '../../../../shared';

export const UpdateBookmarkSchema = object<IUpdateBookmarkGroup>({
  name: string()
    .min(1, minimumLengthMsg(1))
    .max(60, maximumLengthMsg(60))
    .required(requiredField('name')),
});
