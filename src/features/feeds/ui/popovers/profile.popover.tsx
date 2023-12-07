import {
  Avatar,
  Box,
  Card,
  HStack,
  Heading,
  Popover,
  Text,
} from '@holdr-ui/react';
import {
  useFeedContext,
  useCurrentUser,
  CommonRelationshipButton,
  IProfile,
  GET_PROFILE,
  useRelationshipUsers,
} from '../../../../features';
import {
  GQLRenderer,
  LinkText,
  TextGroup,
  prefix,
  useActOnScroll,
  useDialogContext,
} from 'shared';
import { useSuspenseQuery } from '@apollo/client';
import { Fragment } from 'react';

// TODO: add mobile support
//       fix popover to stay active while mouse is over it
function ProfilePopover() {
  const currentUser = useCurrentUser();
  const { owner } = useFeedContext();

  const { isOpen, onOpen, onClose } = useDialogContext();

  const {
    data: { profile },
  } = useSuspenseQuery<{ profile: IProfile }>(GET_PROFILE, {
    variables: {
      username: owner?.username,
    },
  });

  const connections = {
    following: useRelationshipUsers('following', owner?.username || ''),
    followers: useRelationshipUsers('followers', owner?.username || ''),
  };

  // close when scrolling
  useActOnScroll(10, onClose);

  function Content() {
    return (
      <Card gap={4} w='full' p={3}>
        <Card.Header>
          <HStack justify='space-between' items='center'>
            <Avatar src={owner.avatar} size='lg' />
            {currentUser && currentUser.username !== owner.username && (
              <CommonRelationshipButton username={owner.username} />
            )}
          </HStack>
        </Card.Header>
        <Card.Body gap={4}>
          <Box>
            <Heading size={{ '@bp1': 3, '@bp3': 3 }} weight={500} as='h2'>
              {owner.displayName}
            </Heading>
            <LinkText
              to={prefix('/', owner.username)}
              size={{ '@bp1': 1, '@bp3': 2 }}
              color='base400'
              weight={500}
              css={{
                textDecoration: 'unset',
              }}
            >
              {`@${owner.username}`}
            </LinkText>
          </Box>
          <Text>{profile.bio}</Text>
        </Card.Body>
        <Card.Footer>
          <HStack gap={5} w='80%' items='center'>
            <TextGroup direction='horizontal' gap={3} w='fit-content'>
              <Text weight={500}>{connections.followers.total}</Text>
              <Text weight={500} color='base400'>
                Followers
              </Text>
            </TextGroup>
            <TextGroup direction='horizontal' gap={3}>
              <Text weight={500}>{connections.following.total}</Text>
              <Text weight={500} color='base400'>
                Following
              </Text>
            </TextGroup>
          </HStack>
        </Card.Footer>
      </Card>
    );
  }

  return (
    <GQLRenderer
      ErrorFallback={() => <Fragment />}
      LoadingFallback={<Fragment />}
    >
      <Popover isOpen={isOpen} onOpenChange={onOpen}>
        {/** popover doesn't work without this empty trigger */}
        <Popover.Trigger />
        <Popover.Portal>
          <Popover.Content onMouseEnter={onOpen} w='xs' p={0}>
            <Content />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </GQLRenderer>
  );
}

ProfilePopover.displayName = 'ProfilePopover';
export default ProfilePopover;
