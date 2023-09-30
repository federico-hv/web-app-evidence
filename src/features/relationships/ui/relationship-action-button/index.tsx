import {
  getRelationshipButton,
  useCreateRelationshipAction,
  useRelationshipStatusInfo,
  useRemoveRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';
import {
  SwitchConditional,
  SwitchConditionalCase,
  useAlertDialog,
} from '../../../../shared';
import { Box, Button, useSwitch } from '@holdr-ui/react';
import { css } from '../../../../configs';
import { Fragment } from 'react';

const flex = css({
  flexShrink: 0,
});

function UnfollowButton({ username }: { username: string }) {
  const { switchState, turnOn, turnOff } = useSwitch();

  const { unfollow } = useRemoveRelationshipAction();

  const { openWith } = useAlertDialog();

  return (
    <SwitchConditional>
      <SwitchConditionalCase on={!switchState}>
        <Button onMouseEnter={turnOn} variant='outline' className={flex()}>
          Following
        </Button>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={switchState}>
        <Button
          onMouseLeave={turnOff}
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
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}

function FollowButton({ username }: { username: string }) {
  const { follow, loading: loadingFollow } = useCreateRelationshipAction();
  const { followRequest, loading: loadingRequest } =
    useRequestRelationshipAction();

  // TODO: Use profile in some way

  return (
    <Button
      colorTheme={true ? 'primary400' : 'base800'}
      isLoading={true ? loadingRequest : loadingFollow}
      loadingText={loadingRequest || loadingFollow ? '' : 'Loading'}
      onClick={
        true ? () => followRequest(username) : () => follow(username)
      }
    >
      Follow
    </Button>
  );
}

function RelationshipActionButton({ username }: { username: string }) {
  const { data } = useRelationshipStatusInfo(username);

  const type = getRelationshipButton(data.relationshipStatusInfo);

  return (
    <Fragment>
      <Box position='relative' zIndex={5}>
        {type === 'follow' && <FollowButton username={username} />}
        {type === 'following' && <UnfollowButton username={username} />}
      </Box>
    </Fragment>
  );
}
RelationshipActionButton.displayName = 'RelationshipActionButton';

export default RelationshipActionButton;
