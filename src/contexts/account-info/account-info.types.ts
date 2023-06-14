import { IAccountInfo } from 'shared';

export interface IAccountInfoContext {
  name: string;
  loading?: boolean;
  disabled?: (data: any) => boolean;
  data: Partial<IAccountInfo>;
}
