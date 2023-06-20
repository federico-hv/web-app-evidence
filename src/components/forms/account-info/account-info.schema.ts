import { object, string } from 'yup';
import {
  ProfileFormData,
  usernamePattern,
  usernamePatternMsg,
} from 'shared';
import { maximumLengthMsg, minimumLengthMsg } from 'utilities';

export const UpdateAccountInfoSchema = object<ProfileFormData>({
  country: string().optional(),
  gender: string().optional(),
  birthday: string().optional(),
  username: string()
    .min(3, minimumLengthMsg(3))
    .max(15, maximumLengthMsg(15))
    .matches(new RegExp(usernamePattern), usernamePatternMsg)
    .optional(),
});
