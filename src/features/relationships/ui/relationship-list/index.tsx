import { Avatar, Box, Button, useSwitch, VStack } from '@holdr-ui/react';

import {
  ActionItemWrapper,
  Error,
  LinkOverlay,
  Loader,
  prefix,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useAlertDialog,
  UserNamesGroup,
} from '../../../../shared';
import {
  QueryType,
  useCreateRelationshipAction,
  useRelationshipStatusInfo,
  useRelationshipUsers,
  useRemoveRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';
import { css } from '../../../../configs';

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

// Move this outside
function RelationshipActionButton({ username }: { username: string }) {
  const { loading, error, data } = useRelationshipStatusInfo(username);

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading}>
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
      </Loader>
    </Error>
  );
}

function RelationshipList({
  username = '',
  type,
  onClose,
  emptyMessage = { title: 'Empty', subtitle: 'Nothing to display yet.' },
}: {
  emptyMessage?: { title: string; subtitle: string };
  username?: string;
  type: QueryType; // mutual
  onClose?: VoidFunction;
}) {
  const { loading, data, error } = useRelationshipUsers(type, username);

  return (
    <Error hasError={!!error} errorEl={<Box>Error</Box>}>
      <Loader h={100} loading={loading}>
        {data && (
          <SwitchConditional>
            <SwitchConditionalCase
              on={data[type] && data[type]!.total > 0}
            >
              <VStack>
                {data[type]?.users.map((user) => (
                  <ActionItemWrapper key={user.id}>
                    <LinkOverlay
                      onClick={onClose}
                      to={prefix('/', user.username)}
                    />
                    <Avatar
                      variant='squircle'
                      src={user.avatar}
                      name={user.displayName}
                    />
                    <UserNamesGroup
                      displayName={user.displayName}
                      username={user.displayName}
                    />

                    <RelationshipActionButton username={user.username} />
                  </ActionItemWrapper>
                ))}
              </VStack>
            </SwitchConditionalCase>
            <SwitchConditionalCase on={data[type]?.total === 0}>
              <TextGroup items='center'>
                <TextGroupHeading>{emptyMessage.title}</TextGroupHeading>
                <TextGroupSubheading size={2} color='base400' weight={500}>
                  {emptyMessage.subtitle}
                </TextGroupSubheading>
              </TextGroup>
            </SwitchConditionalCase>
          </SwitchConditional>
        )}
      </Loader>
    </Error>
  );
}
RelationshipList.displayName = 'RelationshipList';

export default RelationshipList;
