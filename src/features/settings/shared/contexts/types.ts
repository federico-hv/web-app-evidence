import { IAccountInfo } from '../types';

export interface IAccountInfoContext {
  data: IAccountInfo;
}

export interface IAccountInfoFormContext {
  loading?: boolean;
  disabled?: (data: any) => boolean;
  data: Partial<IAccountInfo>;
  name: string;
}
