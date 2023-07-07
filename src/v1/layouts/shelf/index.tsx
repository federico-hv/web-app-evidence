import { Box, HStack } from '@holdr-ui/react';
import { ReactNode } from 'react';
import { getSubComponent } from '../../utilities';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

interface ShelfLayoutProps {
  children?: ReactNode;
}

type ShelfSCNames = 'Shelf';

function ShelfLayout({ children }: ShelfLayoutProps) {
  const Shelves = getSubComponent<ShelfSCNames>(children, 'Shelf');

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

const Shelf = ({ children, ...props }: ShelfLayoutProps & BoxProps) => (
  <Box {...props}>{children}</Box>
);
Shelf.displayName = 'Shelf';

ShelfLayout.Shelf = Shelf;

export default ShelfLayout;
