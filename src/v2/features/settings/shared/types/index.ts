import { FormProps, IStatus } from '../../../../shared';
import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface IAccountInfo {
  email: string;
  username: string;
  phone: string;
  country: string;
  gender: string;
  birthday: string;
  protected: boolean;
}

export type AccountInfoFormData = Partial<IAccountInfo>;

export interface AccountInfoFormProps
  extends FormProps<AccountInfoFormData> {
  initialValues: AccountInfoFormData;
}

export interface SettingsButtonProp {
  path: string;
  icon?: IconName;
  heading: string;
  subheading?: string;
  capitalize?: { subheading?: boolean; heading?: boolean };
}

export interface UpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordVerification: string;
}

export interface UpdatePasswordPayload {
  payload: UpdatePasswordFormData;
}

export type UpdatePasswordData = { updatePassword: IStatus };

export interface UpdatePasswordFormProps
  extends FormProps<UpdatePasswordFormData> {
  initialValues?: UpdatePasswordFormData;
  onFinish: (cb: VoidFunction) => void;
}

export interface IUpdatePasswordContext {
  loading: boolean;
  data?: IStatus;
}

export interface IChangeContactInfoContext {
  name: 'phone' | 'email';
  update: (value: string) => void;
  phone?: string;
  email?: string;
  close: VoidFunction;
}

export interface IVerifyContactInfo {
  phone?: string;
  email?: string;
  channel: 'sms' | 'email';
}
