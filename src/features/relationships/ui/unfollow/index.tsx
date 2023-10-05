import { css } from '../../../../configs';
import { Button, useSwitch } from '@holdr-ui/react';
import { useRemoveRelationshipAction } from '../../shared';
import { useAlertDialog } from '../../../../shared';
import { Fragment } from 'react';

const flex = css({
  flexShrink: 0,
});

function UnfollowButton({ username }: { username: string }) {
  const { switchState, turnOn, turnOff } = useSwitch();

  const { unfollow } = useRemoveRelationshipAction();

  const { openWith } = useAlertDialog();

  return (
    <Fragment>
      {switchState ? (
        <Button
          onPointerEnter={turnOn}
          variant='outline'
          className={flex()}
        >
          Following
        </Button>
      ) : (
        <Button
          onPointerLeave={turnOff}
          variant='outline'
          className={flex()}
          onClick={() =>
            openWith({
              actionText: 'Unfollow',
              onAction: async () => unfollow(username),
              title: `Unfollow @${username}`,
              description:
                'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
            })
          }
        >
          Unfollow
        </Button>
      )}
    </Fragment>
  );
}
UnfollowButton.displayName = 'UnfollowButton';

export default UnfollowButton;
