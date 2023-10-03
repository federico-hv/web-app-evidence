import { object, string } from 'yup';
import { maximumLengthMsg, minimumLengthMsg } from '../../../../../shared';
import { ProfileFormData } from '../../../../../features';

export const ProfileSchema = object<ProfileFormData>({
  displayName: string()
    .min(3, minimumLengthMsg(3))
    .max(25, maximumLengthMsg(25))
    .optional(),
  bio: string().max(255, maximumLengthMsg(120)).optional(),
});
