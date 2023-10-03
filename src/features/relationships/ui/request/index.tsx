import { Button, Heading } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useRemoveRelationshipAction,
} from '../../shared';
import {
  MenuItem,
  MenuTrigger,
  MenuContent,
  MenuHeader,
  Menu,
  useAlertDialog,
} from '../../../../shared';

function RequestedButton({ username }: BaseRelationshipButtonProps) {
  const { openWith } = useAlertDialog();

  const { removeFollowRequest } = useRemoveRelationshipAction();

  return (
    <Menu align='start'>
      <MenuTrigger>
        <Button colorTheme='base500' rightIcon='caret-down-outline'>
          Requested
        </Button>
      </MenuTrigger>
      <MenuHeader justify='center' items='center'>
        <Heading as='h2' weight={500} size={3}>
          @{username}
        </Heading>
      </MenuHeader>
      <MenuContent>
        <MenuItem
          action={() =>
            openWith({
              actionText: 'Cancel request',
              onAction: () => removeFollowRequest(username),
              title: 'Cancel request',
              description:
                'If you cancel your follow request, you will have to make another request to follow the user. Are you sure you want to cancel it?',
            })
          }
          dangerous
          label='Cancel Request'
          icon='remove-outline'
        />
      </MenuContent>
    </Menu>
  );
}
RequestedButton.displayName = 'RequestedButton';
export default RequestedButton;
