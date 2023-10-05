import { Fragment } from 'react';
import { useFeedContext, useHideFeed } from '../../shared';
import {
  useCreateRelationshipAction,
  useRelationshipStatusInfo,
  useRemoveRelationshipAction,
} from '../../../relationships';
import { Menu } from '../../../../shared';
import { HStack, Text } from '@holdr-ui/react';

function GeneralPostMoreButton({
  hidden = { notInterested: false },
}: {
  hidden?: {
    notInterested?: boolean;
  };
}) {
  const { feedId } = useFeedContext();
  const { owner } = useFeedContext();

  const { data } = useRelationshipStatusInfo(owner.username);
  const { mute, follow } = useCreateRelationshipAction();
  const { unfollow, unmute } = useRemoveRelationshipAction();
  const { hideFeed } = useHideFeed();

  return (
    <Fragment>
      {data && (
        <Menu>
          <Menu.Trigger />
          <Menu.Header />
          <Menu.Content>
            {!hidden.notInterested && (
              <Menu.Item
                label='Not interested'
                icon='emotion-unhappy-outline'
                action={() => hideFeed(feedId, 'Not interested')}
              />
            )}
            {data.relationshipStatusInfo.isFollowing ? (
              <Menu.Item
                action={() => unfollow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack gap={2} fontSize={{ '@bp1': 2, '@bp3': 3 }}>
                  Unfollow <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            ) : (
              <Menu.Item
                action={() => follow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack fontSize={{ '@bp1': 2, '@bp3': 3 }} gap={2}>
                  Follow <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            )}
            {data.relationshipStatusInfo.isMuted ? (
              <Menu.Item
                action={() => unmute(owner.username)}
                icon='mute-fill'
              >
                <HStack fontSize={{ '@bp1': 2, '@bp3': 3 }} gap={2}>
                  Unmute <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            ) : (
              <Menu.Item
                action={() => mute(owner.username)}
                icon='mute-outline'
              >
                <HStack fontSize={{ '@bp1': 2, '@bp3': 3 }} gap={2}>
                  Mute <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            )}
            <Menu.Item
              icon='report-outline'
              label='Report post'
              dangerous
            />
          </Menu.Content>
        </Menu>
      )}
    </Fragment>
  );
}
GeneralPostMoreButton.displayName = 'GeneralPostMoreButton';

export default GeneralPostMoreButton;
