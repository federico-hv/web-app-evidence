import { CreatePostInput } from '../../../shared';

export interface AddMediaProps {
  remove: VoidFunction;
  reset: VoidFunction;
  update: (state: Partial<CreatePostInput>) => void;
}
