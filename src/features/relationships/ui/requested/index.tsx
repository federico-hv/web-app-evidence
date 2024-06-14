import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useRemoveRelationshipAction,
} from '../../shared';

function RequestedButton({ username }: BaseRelationshipButtonProps) {
  const { removeFollowRequest } = useRemoveRelationshipAction();

  return (
    <Button
      onClick={async () => await removeFollowRequest(username)}
      css={{ px: '50px' }}
      colorTheme='purple50'
      variant='outline'
    >
      Requested
    </Button>
  );
}
RequestedButton.displayName = 'RequestedButton';

export default RequestedButton;
