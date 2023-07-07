import { object, string } from 'yup';
import {
  emailPatternMsg,
  phonePattern,
  phonePatternMsg,
} from '../../../shared';

export const ContactVerificationSchema = object({
  email: string().email(emailPatternMsg).optional(),
  phone: string()
    .matches(new RegExp(phonePattern), phonePatternMsg)
    .optional(),
  channel: string().oneOf(['sms', 'email']).required(),
});
