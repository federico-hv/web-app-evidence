import { FeedFilterTypeEnum } from '../../../../features';

export interface FeedFilterProps {
  current: FeedFilterTypeEnum;
  onClick: (value: FeedFilterTypeEnum) => void;
}
