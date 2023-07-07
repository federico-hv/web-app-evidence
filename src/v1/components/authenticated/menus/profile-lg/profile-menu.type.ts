import { IUserSm } from '../../../../shared';

export interface AuthenticatedProfileMenuProps {
  currentUser: IUserSm;
  onClose?: VoidFunction;
}
