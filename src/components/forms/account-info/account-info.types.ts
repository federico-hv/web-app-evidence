import { FormProps, IAccountInfo } from 'shared';

export type AccountInfoFormData = Partial<IAccountInfo>;
export interface AccountInfoFormProps
  extends FormProps<AccountInfoFormData> {
  initialValues: AccountInfoFormData;
}
