import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { StringNumeric } from '../../shared';

export interface FlatListProps<T> extends Omit<StackProps, 'children'> {
  data: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  keyExtractor: (item: T, index: number) => StringNumeric;
}
