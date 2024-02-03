import { Stack } from '@holdr-ui/react';
import { Fragment } from 'react';
import { FlatListProps } from './types';

function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  ...props
}: FlatListProps<T>) {
  return (
    <Stack {...props}>
      {data.map((item, idx) => (
        <Fragment key={keyExtractor(item, idx)}>
          {renderItem(item, idx)}
        </Fragment>
      ))}
    </Stack>
  );
}

FlatList.displayName = 'FlatList';
export { FlatList };
