import { object, ref, string } from 'yup';
import {
  passwordMismatch,
  passwordPattern,
  passwordPatternMsg,
  UpdatePasswordFormData,
} from 'shared';
import { minimumLengthMsg, requiredField } from 'utilities';

export const UpdatePasswordSchema = object<UpdatePasswordFormData>({
  currentPassword: string()
    .min(10, minimumLengthMsg(10))
    .matches(new RegExp(passwordPattern), passwordPatternMsg)
    .required(requiredField('current password')),
  newPassword: string()
    .min(10, minimumLengthMsg(10))
    .matches(new RegExp(passwordPattern), passwordPatternMsg)
    .required(requiredField('new password')),
  newPasswordVerification: string()
    .when('password', (password, field) =>
      password
        ? field.required().oneOf([ref('newPassword')], passwordMismatch)
        : field,
    )
    .required(requiredField('new password verification')),
});
