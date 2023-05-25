import { IProfile, IUserMe } from 'shared';

export interface ProfileContentProps {
  currentUser?: IUserMe | null;
  profile: IProfile;
}
