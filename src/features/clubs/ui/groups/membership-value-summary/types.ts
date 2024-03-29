import { MembershipValueData } from 'features/clubs/shared';
import { StringNumeric } from '../../../../../shared';

export interface ValueStatisticProps {
  leftAddon?: any;
  prefix?: string;
  value: StringNumeric;
  label: string;
}

export interface MembershipValueProps {
  data: MembershipValueData;
}
