import { object, string } from 'yup';
import { ProfileFormData } from 'shared';
import { maximumLengthMsg, minimumLengthMsg } from 'utilities';

export const ProfileSchema = object<ProfileFormData>({
  displayName: string().min(3, minimumLengthMsg(3)).max(30),
  biography: string().max(255, maximumLengthMsg(255)),
});
