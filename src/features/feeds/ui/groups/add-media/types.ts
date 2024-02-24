import { CreatePostInput } from '../../../shared';
import { ReactElement } from 'react';

export interface AddMediaProps {
  as?: ReactElement;
  update: (state: Partial<CreatePostInput>) => void;
}
