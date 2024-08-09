import { Fragment, MouseEventHandler } from 'react';
import { IconButton } from '@holdr-ui/react';
import { ArtistOwnerGuard } from '../../../../features';

function ArtistEditItemButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <ArtistOwnerGuard Fallback={<Fragment />}>
      <IconButton
        onClick={onClick}
        size='sm'
        colorTheme='white100'
        icon='edit-fill'
        ariaLabel='edit'
        // variant='ghost'
      />
    </ArtistOwnerGuard>
  );
}

export default ArtistEditItemButton;
