import { object, ref, string } from 'yup';
import {
  emailPatternMsg,
  maximumLengthMsg,
  minimumLengthMsg,
  passwordMismatch,
  passwordPattern,
  passwordPatternMsg,
  phonePattern,
  phonePatternMsg,
  requiredField,
  usernamePattern,
  usernamePatternMsg,
} from '../../../../shared';
import { UpdatePasswordFormData } from '../types';

import { ProfileFormData } from '../../../user';

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

export const updatePasswordValues: UpdatePasswordFormData = {
  currentPassword: '',
  newPassword: '',
  newPasswordVerification: '',
};

export const ContactVerificationSchema = object({
  email: string().email(emailPatternMsg).optional(),
  phone: string()
    .matches(new RegExp(phonePattern), phonePatternMsg)
    .optional(),
  channel: string().oneOf(['sms', 'email']).required(),
});

export const UpdatePasswordSchema = object<UpdatePasswordFormData>({
  currentPassword: string()
    .min(10, minimumLengthMsg(10))
    .matches(new RegExp(passwordPattern), passwordPatternMsg)
    .required(requiredField('current account-info-guard')),
  newPassword: string()
    .min(10, minimumLengthMsg(10))
    .matches(new RegExp(passwordPattern), passwordPatternMsg)
    .required(requiredField('new account-info-guard')),
  newPasswordVerification: string()
    .when('password', (password, field) =>
      password
        ? field.required().oneOf([ref('newPassword')], passwordMismatch)
        : field,
    )
    .required(requiredField('new account-info-guard verification')),
});
