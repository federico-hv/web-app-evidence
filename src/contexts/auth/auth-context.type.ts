import { IUserSm } from 'shared';

interface IUserMe extends IUserSm {
  role: string;
  firstTimeLogin?: boolean;
}

export interface IAuthContext {
  user?: IUserMe | null;
}
