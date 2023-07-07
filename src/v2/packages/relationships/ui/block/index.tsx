import { Button } from '@holdr-ui/react';
import { useParams } from 'react-router-dom';
import { useRemoveRelationshipAction } from '../../shared';

function BlockButton() {
  const { username } = useParams();

  const { removeBlock, loading: loadingRemoval } =
    useRemoveRelationshipAction(username || '');

  return (
    <Button
      colorTheme='danger'
      onClick={removeBlock}
      isLoading={loadingRemoval}
      loadingText={loadingRemoval ? '' : 'Unblocking'}
    >
      Unblock
    </Button>
  );
}
BlockButton.displayName = 'BlockButton';

export default BlockButton;
