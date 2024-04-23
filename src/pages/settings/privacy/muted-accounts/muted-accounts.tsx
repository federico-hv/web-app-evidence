import { useQuery } from '@apollo/client';
import {
  GET_MUTED_ACCOUNTS,
  useRemoveRelationshipAction,
} from '../../../../features';
import {
  ActionItemWrapper,
  Error,
  Head,
  IFetchUsersResponse,
  LinkOverlay,
  Loader,
  Paths,
  prefix,
  RootSettingsPath,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  UserNamesGroup,
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
import SettingsHeaderLayout from '../../../../layout/settings-header';

function MutedSettingsPage() {
  const { data, loading, error } = useQuery<{
    mutedUsers: IFetchUsersResponse;
  }>(GET_MUTED_ACCOUNTS, { fetchPolicy: 'cache-and-network' });

  const { unmute, loading: muteLoading } = useRemoveRelationshipAction();

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Muted accounts'
        description='See the accounts that have been muted.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <SettingsHeaderLayout
        title='Muted accounts'
        backLink={prefix(RootSettingsPath, Paths.setting.manage_users)}
      >
        <Loader loading={loading}>
          {data && (
            <SwitchConditional>
              <SwitchConditionalCase on={data.mutedUsers.total < 1}>
                <Box px={4}>
                  <TextGroup items='center'>
                    <TextGroupHeading>No Muted Users</TextGroupHeading>
                    <TextGroupSubheading
                      size={2}
                      color='base400'
                      weight={500}
                    >
                      All users that you have muted will appear here.
                    </TextGroupSubheading>
                  </TextGroup>
                </Box>
              </SwitchConditionalCase>
              <SwitchConditionalCase on={data.mutedUsers.total > 0}>
                <Box px={4} py={4} borderBottom={2} borderColor='base100'>
                  <InputGroup radius='full'>
                    <InputGroup.LeftElement>
                      <Icon name='search-outline' />
                    </InputGroup.LeftElement>
                    <Input placeholder='Search' />
                  </InputGroup>
                </Box>
                <VStack pt={1} px={4}>
                  {data.mutedUsers.users.map((item) => (
                    <ActionItemWrapper key={item.id}>
                      <LinkOverlay to={prefix('/', item.username)} />
                      <Avatar src={item.avatar} name={item.displayName}/>
                      <UserNamesGroup
                        displayName={item.displayName}
                        username={item.username}
                      />
                      <Box zIndex={10}>
                        <Button
                          onClick={async () => unmute(item.username)}
                          isLoading={muteLoading}
                          loadingText={muteLoading ? '' : 'Unmute'}
                        >
                          Unmute
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
    </Error>
  );
}
MutedSettingsPage.displayName = 'MutedSettingsPage';

export default MutedSettingsPage;
