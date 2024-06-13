import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useRemoveRelationshipAction,
} from '../../shared';

function UnblockButton({ username }: BaseRelationshipButtonProps) {
  const { removeBlock, loading: loadingRemoval } =
    useRemoveRelationshipAction();

  return (
    <Button
      css={{
        px: '50px',
      }}
      colorTheme='danger500'
      onClick={() => removeBlock(username)}
      isLoading={loadingRemoval}
      loadingText={loadingRemoval ? '' : 'Unblocking'}
    >
      Unblock
    </Button>
  );
}
UnblockButton.displayName = 'UnblockButton';

export default UnblockButton;
