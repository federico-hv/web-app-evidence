import { useQuery } from '@apollo/client';
import {
  GET_MUTED_ACCOUNTS,
  useRemoveRelationshipAction,
} from '../../../features';
import {
  ActionItemWrapper,
  ContentBox,
  Error,
  Head,
  HeaderLayout,
  IUser,
  LinkOverlay,
  Loader,
  Paths,
  prefix,
  RootSettingsPath,
  SwitchConditional,
  SwitchConditionalCase,
  UserNamesGroup,
} from '../../../shared';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  VStack,
} from '@holdr-ui/react';

function MutedSettingsPage() {
  const { data, loading, error } = useQuery<{ mutedUsers: IUser[] }>(
    GET_MUTED_ACCOUNTS,
    { fetchPolicy: 'cache-and-network' },
  );

  const { unmute, loading: muteLoading } = useRemoveRelationshipAction();

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Muted accounts'
        description='See the accounts that have been muted.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout
        title='Muted accounts'
        backLink={prefix(RootSettingsPath, Paths.setting.manage_users)}
      >
        <Loader loading={loading}>
          {data && (
            <SwitchConditional>
              <SwitchConditionalCase on={data.mutedUsers.length < 1}>
                <Box px={4}>
                  <ContentBox>Nothing to display</ContentBox>
                </Box>
              </SwitchConditionalCase>
              <SwitchConditionalCase on={data.mutedUsers.length > 0}>
                <Box px={4} py={4} borderBottom={2} borderColor='base100'>
                  <InputGroup radius='full'>
                    <InputGroup.LeftElement>
                      <Icon name='search-outline' />
                    </InputGroup.LeftElement>
                    <Input placeholder='Search' />
                  </InputGroup>
                </Box>
                <VStack pt={1} px={4}>
                  {data.mutedUsers.map((item) => (
                    <ActionItemWrapper key={item.id}>
                      <LinkOverlay to={prefix('/', item.username)} />
                      <Avatar src={item.avatar} />
                      <UserNamesGroup
                        displayName={item.displayName}
                        username={item.username}
                      />
                      <Button
                        onClick={async () => unmute(item.username)}
                        isLoading={muteLoading}
                        loadingText={muteLoading ? '' : 'Unmute'}
                      >
                        Unmute
                      </Button>
                    </ActionItemWrapper>
                  ))}
                </VStack>
              </SwitchConditionalCase>
            </SwitchConditional>
          )}
        </Loader>
      </HeaderLayout>
    </Error>
  );
}
MutedSettingsPage.displayName = 'MutedSettingsPage';

export default MutedSettingsPage;
