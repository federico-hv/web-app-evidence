import { Box, HStack } from '@holdr-ui/react';
import { getSubComponent } from '../../utilities';
import { GenericProps } from '../../interfaces';
import { ShelfSCNames } from './types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

function ShelfLayout({ children }: GenericProps) {
  const Shelves = getSubComponent<ShelfSCNames>(
    children,
    'ShelfLayoutShelf',
  );

  return (
    <HStack
      borderLeft={2}
      borderColor='base100'
      position='relative'
      t={65}
      h='calc(100vh - 65px)'
    >
      {Shelves}
    </HStack>
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
