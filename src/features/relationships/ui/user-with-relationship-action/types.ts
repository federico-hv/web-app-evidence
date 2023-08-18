import { UserModel } from '../../../../shared';

export interface UserWithRelationshipProps {
  data: UserModel;
  onClose?: VoidFunction;
}
