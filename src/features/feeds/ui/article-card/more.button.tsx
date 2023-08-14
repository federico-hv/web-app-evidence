import { HStack, IconButton, Text } from '@holdr-ui/react';
import { useFeedContext } from '../../shared';
import {
  useCreateRelationshipAction,
  useRelationshipStatusInfo,
  useRemoveRelationshipAction,
} from '../../../relationships';
import { Loader, Menu } from '../../../../shared';

function MoreButton() {
  const { owner } = useFeedContext();
  const { loading, data } = useRelationshipStatusInfo(owner.username);
  const { mute, follow } = useCreateRelationshipAction();
  const { unfollow, unmute } = useRemoveRelationshipAction();

  return (
    <Loader loading={loading}>
      {data && (
        <Menu>
          <Menu.Trigger>
            <IconButton
              colorTheme='darkTint400'
              blur='xl'
              icon='more-fill'
              boxShadow='none'
              ariaLabel='view options'
            />
          </Menu.Trigger>
          <Menu.Header />
          <Menu.Content>
            <Menu.Item
              icon='article-read-outline'
              label='Already read this'
            />
            {data.relationshipStatusInfo.isFollowing ? (
              <Menu.Item
                action={() => unfollow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack gap={2}>
                  Unfollow <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            ) : (
              <Menu.Item
                action={() => follow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack gap={2}>
                  Follow <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            )}
            {data.relationshipStatusInfo.isMuted ? (
              <Menu.Item
                action={() => unmute(owner.username)}
                icon='mute-fill'
              >
                <HStack gap={2}>
                  Unmute <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            ) : (
              <Menu.Item
                action={() => mute(owner.username)}
                icon='mute-outline'
              >
                <HStack gap={2}>
                  Mute <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            )}
            {/*<Menu.Item icon='remove-outline'>*/}
            {/*  <HStack gap={2}>*/}
            {/*    Block <Text weight={500}>{source.name}</Text>*/}
            {/*  </HStack>*/}
            {/*</Menu.Item>*/}
            <Menu.Item
              label='Hide article'
              action={() => mute(owner.username)}
              icon='eye-hide'
            />
            <Menu.Item
              icon='report-outline'
              label='Report article'
              dangerous
            />
          </Menu.Content>
        </Menu>
      )}
    </Loader>
  );
}
MoreButton.displayName = 'MoreButton';

export default MoreButton;
