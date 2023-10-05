import { IPoll } from '../../../shared';

export interface PollsProps {
  items: IPoll[];
  id: number;
  endDate?: Date | null;
}
