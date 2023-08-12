import { ProfileFormData } from '../../shared';
import { FormProps } from '../../../../shared';

export interface ProfileFormProps extends FormProps<ProfileFormData> {
  initialValues?: ProfileFormData;
}
