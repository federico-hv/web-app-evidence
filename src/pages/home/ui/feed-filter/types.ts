import { FeedFilterValue } from '../../shared';

export interface FeedFilterProps {
  current: FeedFilterValue;
  onClick: (value: FeedFilterValue) => void;
}
