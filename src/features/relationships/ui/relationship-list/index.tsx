import { Box, VStack } from '@holdr-ui/react';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { QueryType, useRelationshipUsers } from '../../shared';
import UserWithRelationshipAction from '../user-with-relationship-action';

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
        {data && (
          <SwitchConditional>
            <SwitchConditionalCase
              on={data[type] && data[type]!.total > 0}
            >
              <VStack>
                {data[type]?.users.map((user) => (
                  <UserWithRelationshipAction
                    key={user.id}
                    onClose={onClose}
                    data={user}
                  />
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
