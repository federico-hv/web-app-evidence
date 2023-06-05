import { FormProps, ProfileFormData } from 'shared';

export interface ProfileFormProps extends FormProps<ProfileFormData> {
  optional?: string;
}
