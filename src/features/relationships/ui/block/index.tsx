import { Button } from '@holdr-ui/react';
import { useRemoveRelationshipAction } from '../../shared';
import { useProfile } from '../../../../shared';

function BlockButton() {
  const { profile } = useProfile();

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
BlockButton.displayName = 'BlockButton';

export default BlockButton;
