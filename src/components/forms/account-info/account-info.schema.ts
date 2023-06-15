import { object, string } from 'yup';
import {
  emailPatternMsg,
  phonePattern,
  phonePatternMsg,
  ProfileFormData,
  usernamePattern,
  usernamePatternMsg,
} from 'shared';
import { maximumLengthMsg, minimumLengthMsg } from 'utilities';

export const UpdateAccountInfoSchema = object<ProfileFormData>({
  email: string().email(emailPatternMsg).optional(),
  phone: string()
    .matches(new RegExp(phonePattern), phonePatternMsg)
    .optional(),
  country: string().optional(),
  gender: string().optional(),
  birthday: string().optional(),
  username: string()
    .min(3, minimumLengthMsg(3))
    .max(15, maximumLengthMsg(15))
    .matches(new RegExp(usernamePattern), usernamePatternMsg)
    .optional(),
});
