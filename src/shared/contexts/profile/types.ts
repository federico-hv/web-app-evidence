import { IProfile } from '../../../features';

export interface IProfileContext {
  profile: IProfile;
  loading?: boolean;
}
