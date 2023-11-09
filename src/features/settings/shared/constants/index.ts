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
  AuthProviderName,
  requiredField,
  usernamePattern,
  usernamePatternMsg,
} from '../../../../shared';
import { IProviderItem, UpdatePasswordFormData } from '../types';

import googleLogo from '../../../../assets/images/google-logo.png';
import facebookLogo from '../../../../assets/images/facebook-logo.png';
import appleMusicLogo from '../../../../assets/images/apple-music-logo.png';
import darkAppleLogo from '../../../../assets/images/apple-music-logo.png';
import spotifyLogo from '../../../../assets/images/spotify-logo.png';
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

export const Provider: Record<AuthProviderName, IProviderItem> = {
  google: {
    image: googleLogo,
    name: 'Google',
  },
  facebook: {
    image: facebookLogo,
    name: 'Facebook',
  },
  spotify: {
    image: spotifyLogo,
    name: 'Spotify',
  },
  apple: {
    image: darkAppleLogo,
    name: 'Apple',
  },
  'apple-music': {
    image: appleMusicLogo,
    name: 'Apple Music',
  },
};
