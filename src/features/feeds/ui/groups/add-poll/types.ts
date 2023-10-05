import { CreatePostInput } from '../../../shared';

export interface AddPollProps {
  update: (state: Partial<CreatePostInput>) => void;
  remove: VoidFunction;
  reset: VoidFunction;
  increaseHeight: (amount: number) => void;
}

export interface ITime {
  days: number;
  hours: number;
  minutes: number;
}
