import {
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

const protectedAccount = false; // use query

function FollowButton({ username }: { username: string }) {
  const { follow, loading: loading0 } = useCreateRelationshipAction();
  const { followRequest, loading: loading1 } =
    useRequestRelationshipAction();

  return (
    <SwitchConditional>
      <SwitchConditionalCase on={!protectedAccount}>
        <Button
          colorTheme='base800'
          isLoading={loading0}
          loadingText={loading0 ? '' : 'Loading'}
          onClick={async () => follow(username)}
        >
          Follow
        </Button>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={protectedAccount}>
        <Button
          colorTheme='primary400'
          isLoading={loading1}
          loadingText={loading1 ? '' : 'Loading'}
          onClick={async () => followRequest(username)}
        >
          Follow
        </Button>
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}

function RelationshipActionButton({ username }: { username: string }) {
  const { data } = useRelationshipStatusInfo(username);

  return (
    <Fragment>
      <Box position='relative' zIndex={5}>
        {data && (
          <SwitchConditional>
            <SwitchConditionalCase
              on={
                !data.relationshipStatusInfo.isFollowing &&
                !data.relationshipStatusInfo.isOwned &&
                !data.relationshipStatusInfo.hasFollowRequest &&
                !data.relationshipStatusInfo.isBlocked
              }
            >
              <FollowButton username={username} />
            </SwitchConditionalCase>
            <SwitchConditionalCase
              on={
                !!data.relationshipStatusInfo.isFollowing &&
                !data.relationshipStatusInfo.isBlocked
              }
            >
              <UnfollowButton username={username} />
            </SwitchConditionalCase>
          </SwitchConditional>
        )}
      </Box>
    </Fragment>
  );
}
RelationshipActionButton.displayName = 'RelationshipActionButton';

export default RelationshipActionButton;
