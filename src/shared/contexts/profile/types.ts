import { IProfile } from '../../../pages/profile/shared';

export interface IProfileContext {
  profile: IProfile;
  loading?: boolean;
}
