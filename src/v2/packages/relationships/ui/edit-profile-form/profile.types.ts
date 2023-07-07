import { ProfileFormData } from '../../shared';
import { FormProps } from '../../../common';

export interface ProfileFormProps extends FormProps<ProfileFormData> {
  initialValues?: ProfileFormData;
}
