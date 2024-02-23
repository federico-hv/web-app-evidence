import { CreatePostInput } from '../../../shared';

export interface AddPollProps {
  update: (state: Partial<CreatePostInput>) => void;
}

export interface ITime {
  days: number;
  hours: number;
  minutes: number;
}
