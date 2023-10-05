import { FormProps } from '../../../../../shared';
import { ProfileFormData } from '../../../../../features';

export interface ProfileFormProps extends FormProps<ProfileFormData> {
  initialValues?: ProfileFormData;
}
