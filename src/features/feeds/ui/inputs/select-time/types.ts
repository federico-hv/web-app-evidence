import { StringNumeric } from '../../../../../shared';
import { ChangeEvent } from 'react';

export interface SelectTimeProps {
  startFrom: number;
  name: string;
  value: StringNumeric;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  numberOfOptions: number;
}
