import { GenericProps, IUserSm, LinkOverlay } from '../../../shared';
import {
  Avatar,
  Box,
  Center,
  Circle,
  Heading,
  HStack,
  IconButton,
  Popover,
  Tabs,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  GET_RELATIONSHIP_REQUESTS,
  RelationshipRequest,
  useAcceptRelationshipRequest,
  useDeclineRelationshipRequest,
} from '../../../lib';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ContentBox } from '../../support';
import { Loader } from '../../utility';
import { TextGroup, TextGroupSubheading } from '../../groups';
import { prefix } from '../../../utilities';

function BadgeWrapper({
  children,
  isOn,
}: GenericProps & { isOn?: boolean }) {
  return (
    <Box position='relative'>
      {children}
      {isOn === true && (
        <Circle
          border={2}
          position='absolute'
          t={0}
          r={0}
          size={10}
          bgColor='danger'
          css={{
            borderColor: '#f6f6f6',
          }}
        />
      )}
    </Box>
  );
}

function UserRequestItem({
  id,
  user,
  type,
  onClick,
}: {
  id: number;
  user: IUserSm;
  type: 'hasFollowRequest' | 'hasFriendRequest';
  onClick: VoidFunction;
}) {
  const { accept, loading: loadingAccept } =
    useAcceptRelationshipRequest();
  const { decline, loading: loadingDecline } =
    useDeclineRelationshipRequest();

  return (
    <HStack
      key={id}
      gap={4}
      px={3}
      py={4}
      radius={3}
      cursor='pointer'
      _hover={{
        backgroundColor: '$base100',
      }}
    >
      <LinkOverlay onClick={onClick} to={prefix('/', user.username)} />
      <Avatar src={user.avatar} name={user.username} />
      <TextGroup gap={0}>
        <TextGroupSubheading weight={500}>
          {user.displayName}
        </TextGroupSubheading>
        <TextGroupSubheading color='base400' size={2} as='i'>
          {type === 'hasFollowRequest'
            ? 'Follow Request'
            : 'Friend Request'}
        </TextGroupSubheading>
      </TextGroup>
      <HStack gap={4}>
        <IconButton
          icon='close'
          ariaLabel='accept'
          colorTheme='danger'
          loadingText=''
          isLoading={loadingDecline}
          onClick={() => decline(id)}
        />
        <IconButton
          icon='check'
          ariaLabel='accept'
          colorTheme='primary400'
          loadingText=''
          isLoading={loadingAccept}
          onClick={() => accept(id)}
        />
      </HStack>
    </HStack>
  );
}

function NotificationsButton() {
  const { data, loading } = useQuery<{
    relationshipRequests: RelationshipRequest[];
  }>(GET_RELATIONSHIP_REQUESTS, { fetchPolicy: 'cache-and-network' });

  const [isOpen, setOpen] = useState(false);

  const closePopover = () => setOpen(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setOpen}>
      <Popover.Trigger>
        <BadgeWrapper isOn={data && data.relationshipRequests.length > 0}>
          <IconButton
            icon={isOpen ? 'notification-fill' : 'notification-outline'}
            colorTheme='primary400'
            ariaLabel={
              isOpen ? 'close notifications' : 'open notifications'
            }
            variant='filled'
          />
        </BadgeWrapper>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          alignOffset={-60}
          sideOffset={20}
          align='end'
          h='calc(98.5vh - 68px)'
          w={400}
          zIndex={50}
        >
          <Box px={3} py={3} borderBottom={1} borderColor='base100'>
            <Heading as='h4' size={4} weight={500}>
              Notifications
            </Heading>
          </Box>
          <Tabs defaultValue='all'>
            <Tabs.List
              css={{
                py: '$3',
                px: '$1',
              }}
            >
              <Tabs.Trigger value='all'>All</Tabs.Trigger>
              <Tabs.Trigger value='requests'>Requests</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='all'>
              <VStack
                position='absolute'
                t={85}
                w='calc(100% - 1rem)'
                h='calc(100% - 100px)'
                justify='space-between'
                borderTop={1}
                borderColor='base100'
                mt={4}
                pt={4}
              >
                <ContentBox>🚧 Under construction 🚧</ContentBox>
                <Center
                  cursor='pointer'
                  py={4}
                  mb={3}
                  borderTop={1}
                  borderColor='base100'
                  _hover={{
                    backgroundColor: '$base100',
                    borderRadius: '$3',
                    borderTop: 0,
                  }}
                >
                  <Text weight={500}>View all</Text>
                </Center>
              </VStack>
            </Tabs.Content>
            <Tabs.Content value='requests'>
              <Loader loading={loading}>
                <VStack
                  position='absolute'
                  t={85}
                  w='calc(100% - 1rem)'
                  h='calc(100% - 100px)'
                  justify='space-between'
                  borderTop={1}
                  borderColor='base100'
                  mt={4}
                  pt={4}
                >
                  {data && (
                    <VStack
                      divider={
                        <Box borderBottom={1} borderColor='base100' />
                      }
                    >
                      {data.relationshipRequests.map(
                        ({ id, requestType, requester }) => (
                          <UserRequestItem
                            key={id}
                            id={id}
                            type={requestType}
                            user={requester}
                            onClick={closePopover}
                          />
                        ),
                      )}
                    </VStack>
                  )}
                  <Center
                    cursor='pointer'
                    py={4}
                    mb={3}
                    borderTop={1}
                    borderColor='base100'
                    _hover={{
                      backgroundColor: '$base100',
                      borderRadius: '$3',
                      borderTop: 0,
                    }}
                  >
                    <Text weight={500}>View all</Text>
                  </Center>
                </VStack>
              </Loader>
            </Tabs.Content>
          </Tabs>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationsButton.displayName = 'NotificationsButton';

export default NotificationsButton;
