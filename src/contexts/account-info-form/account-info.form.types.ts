import { IAccountInfo } from 'shared';

export interface IAccountInfoFormContext {
  loading?: boolean;
  disabled?: (data: any) => boolean;
  data: Partial<IAccountInfo>;
  name: string;
}
