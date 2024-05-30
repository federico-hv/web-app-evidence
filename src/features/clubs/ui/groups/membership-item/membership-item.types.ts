import { UserModel } from '../../../../../shared';

export interface MembershipItemProps {
  data: {
    price: number;
    percentage: number;
    number: string;
    name: string;
    artist: UserModel;
  };
}
