import { Box, Stack } from '@holdr-ui/react';
import { getSubComponent } from '../../shared';
import { ShelfSCNames } from './types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';

function ShelfLayout({ children, css, ...props }: StackProps) {
  const Shelves = getSubComponent<ShelfSCNames>(
    children,
    'ShelfLayoutShelf',
  );

  return (
    <Stack
      borderColor='base100'
      position='relative'
      h='100%'
      css={{
        '@bp1': { flexDirection: 'column' },
        '@bp3': {
          flexDirection: 'row',
        },
        ...css,
      }}
      {...props}
    >
      {Shelves}
    </Stack>
  );
}
ShelfLayout.displayName = 'ShelfLayout';

const ShelfLayoutShelf = ({ children, ...props }: BoxProps) => (
  <Box {...props}>{children}</Box>
);
ShelfLayoutShelf.displayName = 'ShelfLayoutShelf';

ShelfLayout.Shelf = ShelfLayoutShelf;

export { ShelfLayoutShelf };

export default ShelfLayout;
