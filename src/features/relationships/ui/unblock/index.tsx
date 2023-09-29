import { Button } from '@holdr-ui/react';
import { IProfile, useRemoveRelationshipAction } from '../../shared';
import { useGeneralContext } from '../../../../shared';

function UnblockButton() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { removeBlock, loading: loadingRemoval } =
    useRemoveRelationshipAction();

  return (
    <Button
      colorTheme='danger'
      onClick={() => removeBlock(profile.username)}
      isLoading={loadingRemoval}
      loadingText={loadingRemoval ? '' : 'Unblocking'}
    >
      Unblock
    </Button>
  );
}
UnblockButton.displayName = 'UnblockButton';

export default UnblockButton;
