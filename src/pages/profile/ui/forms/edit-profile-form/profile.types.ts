import { FormProps } from '../../../../../shared';

export interface ProfileFormData {
  displayName: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
}

export interface UpdateProfilePayload {
  payload: ProfileFormData;
}

export interface ProfileFormProps extends FormProps<ProfileFormData> {
  initialValues?: ProfileFormData;
}
