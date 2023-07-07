import { FormProps, UpdatePasswordFormData } from '../../../shared';

export interface UpdatePasswordFormProps
  extends FormProps<UpdatePasswordFormData> {
  initialValues?: UpdatePasswordFormData;
  onFinish: (cb: VoidFunction) => void;
}
