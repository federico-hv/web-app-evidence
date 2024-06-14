import { OwnedMembershipModel } from '../../../shared';
import { CardProps } from '@holdr-ui/react';

export interface MembershipCardProps extends CardProps {
  data: OwnedMembershipModel;
}
