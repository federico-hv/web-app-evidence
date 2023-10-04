import { Fragment } from 'react';
import { HStack, IconButton, Text } from '@holdr-ui/react';
import { useFeedContext, useHideFeed } from '../../shared';
import {
  useCreateRelationshipAction,
  useRelationshipStatusInfo,
  useRemoveRelationshipAction,
} from '../../../relationships';
import { Menu } from '../../../../shared';

function GeneralArticleMoreButton({
  tinted = true,
}: {
  tinted?: boolean;
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
          <Menu.Trigger>
            <IconButton
              size={{ '@bp1': 'sm', '@bp3': 'base' }}
              variant={tinted ? 'filled' : 'ghost'}
              colorTheme={tinted ? 'darkTint400' : 'base800'}
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
              action={() => hideFeed(feedId, 'Already read this')}
            />
            <Menu.Item
              label='Not interested'
              icon='emotion-unhappy-outline'
              action={() => hideFeed(feedId, 'Not interested')}
            />
            {data.relationshipStatusInfo.isFollowing ? (
              <Menu.Item
                action={() => unfollow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack fontSize={{ '@bp1': 2, '@bp3': 3 }} gap={2}>
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
              label='Report article'
              dangerous
            />
          </Menu.Content>
        </Menu>
      )}
    </Fragment>
  );
}
GeneralArticleMoreButton.displayName = 'GeneralMoreButton';

export default GeneralArticleMoreButton;
