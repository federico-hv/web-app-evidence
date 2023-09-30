import { Avatar, Box, HStack, VStack } from '@holdr-ui/react';
import {
  Error,
  LinkOverlay,
  Loader,
  prefix,
  UserNamesGroup,
} from '../../../../shared';
import { QueryType, useRelationshipUsers } from '../../shared';
import RelationshipActionButton from '../relationship-action-button';
import { EmptyMessage } from '../../../../pages/profile/ui/content';

// Move this outside

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
        {data && data[type] && data[type]!.total > 0 ? (
          <VStack gap={{ '@bp1': 4, '@bp3': 5 }}>
            {data[type]?.users.map((user) => (
              <HStack
                key={user.id}
                w='100%'
                justify='space-between'
                position='relative'
              >
                <HStack gap={3}>
                  <LinkOverlay
                    onClick={onClose}
                    to={prefix('/', user.username)}
                  />
                  <Avatar
                    size={{ '@bp1': 'sm', '@bp3': 'base' }}
                    variant='squircle'
                    src={user.avatar}
                    name={user.displayName}
                  />
                  <UserNamesGroup
                    displayName={user.displayName}
                    username={user.displayName}
                  />
                </HStack>
                <RelationshipActionButton username={user.username} />
              </HStack>
            ))}
          </VStack>
        ) : (
          // TODO: Replace with empty
          <EmptyMessage {...emptyMessage} />
        )}
      </Loader>
    </Error>
  );
}
RelationshipList.displayName = 'RelationshipList';

export default RelationshipList;
