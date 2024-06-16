import {
  Error,
  Head,
  Loader,
  Paths,
  LinkOverlay,
  prefix,
  RootSettingsPath,
  SwitchConditional,
  SwitchConditionalCase,
  UserNamesGroup,
  ActionItemWrapper,
  IFetchUsersResponse,
  TextGroupHeading,
  TextGroupSubheading,
  TextGroup,
} from '../../../../shared';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  VStack,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import {
  GET_BLOCKED_ACCOUNTS,
  useRemoveRelationshipAction,
} from '../../../../features';
import SettingsHeaderLayout from '../../../../layout/settings-header';
import { Fragment } from 'react';

function BlockedSettingsPage() {
  const { data, loading, error } = useQuery<{
    blockedUsers: IFetchUsersResponse;
  }>(GET_BLOCKED_ACCOUNTS, { fetchPolicy: 'cache-and-network' });

  const { removeBlock, loading: removalLoading } =
    useRemoveRelationshipAction();

  return (
    <Fragment>
      <Head
        title='Blocked accounts'
        description='See the accounts that have been blocked.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <SettingsHeaderLayout
        title='Blocked accounts'
        backLink={prefix(RootSettingsPath, Paths.setting.manage_users)}
      >
        <Loader loading={loading}>
          {data && (
            <SwitchConditional>
              <SwitchConditionalCase on={data.blockedUsers.total < 1}>
                <Box px={4}>
                  <TextGroup items='center'>
                    <TextGroupHeading>No Blocked Users</TextGroupHeading>
                    <TextGroupSubheading
                      size={2}
                      color='base400'
                      weight={500}
                    >
                      All users that you have blocked will appear here.
                    </TextGroupSubheading>
                  </TextGroup>
                </Box>
              </SwitchConditionalCase>
              <SwitchConditionalCase on={data.blockedUsers.total > 0}>
                <Box px={4} py={4} borderBottom={2} borderColor='base100'>
                  <InputGroup radius='full'>
                    <InputGroup.LeftElement>
                      <Icon name='search-outline' />
                    </InputGroup.LeftElement>
                    <Input placeholder='Search' />
                  </InputGroup>
                </Box>
                <VStack pt={4} px={4} gap={5}>
                  {data.blockedUsers.users.map((item) => (
                    <ActionItemWrapper key={item.id}>
                      <LinkOverlay to={prefix('/', item.username)} />
                      <Avatar src={item.avatar} name={item.displayName} />
                      <UserNamesGroup
                        displayName={item.displayName}
                        username={item.username}
                      />
                      <Box zIndex={10}>
                        <Button
                          onClick={async () => removeBlock(item.username)}
                          isLoading={removalLoading}
                          loadingText={removalLoading ? '' : 'Loading'}
                        >
                          Unblock
                        </Button>
                      </Box>
                    </ActionItemWrapper>
                  ))}
                </VStack>
              </SwitchConditionalCase>
            </SwitchConditional>
          )}
        </Loader>
      </SettingsHeaderLayout>
    </Fragment>
  );
}
BlockedSettingsPage.displayName = 'BlockedSettingsPage';

export default BlockedSettingsPage;
