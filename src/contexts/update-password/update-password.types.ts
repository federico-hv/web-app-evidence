import { IStatus } from 'shared';

export interface IUpdatePasswordContext {
  loading: boolean;
  data?: IStatus;
}
