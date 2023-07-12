import {
  ContentBox,
  Error,
  Head,
  HeaderLayout,
  IUser,
  Loader,
  Paths,
  LinkOverlay,
  prefix,
  RootSettingsPath,
  SwitchConditional,
  SwitchConditionalCase,
  UserNamesGroup,
  ActionItemWrapper,
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
import { useQuery } from '@apollo/client';
import {
  GET_BLOCKED_ACCOUNTS,
  useRemoveRelationshipAction,
} from '../../../features';

function BlockedSettingsPage() {
  const { data, loading, error } = useQuery<{ blockedUsers: IUser[] }>(
    GET_BLOCKED_ACCOUNTS,
    { fetchPolicy: 'cache-and-network' },
  );

  const { removeBlock, loading: removalLoading } =
    useRemoveRelationshipAction();

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Head
        title='Blocked accounts'
        description='See the accounts that have been blocked.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout
        title='Blocked accounts'
        backLink={prefix(RootSettingsPath, Paths.setting.manage_users)}
      >
        <Loader loading={loading}>
          {data && (
            <SwitchConditional>
              <SwitchConditionalCase on={data.blockedUsers.length < 1}>
                <Box px={4}>
                  <ContentBox>Nothing to display</ContentBox>
                </Box>
              </SwitchConditionalCase>
              <SwitchConditionalCase on={data.blockedUsers.length > 0}>
                <Box px={4} py={4} borderBottom={2} borderColor='base100'>
                  <InputGroup radius='full'>
                    <InputGroup.LeftElement>
                      <Icon name='search-outline' />
                    </InputGroup.LeftElement>
                    <Input placeholder='Search' />
                  </InputGroup>
                </Box>
                <VStack pt={4} px={4} gap={5}>
                  {data.blockedUsers.map((item) => (
                    <ActionItemWrapper key={item.id}>
                      <LinkOverlay to={prefix('/', item.username)} />
                      <Avatar src={item.avatar} />
                      <UserNamesGroup
                        displayName={item.displayName}
                        username={item.username}
                      />
                      <Button
                        onClick={async () => removeBlock(item.username)}
                        isLoading={removalLoading}
                        loadingText={removalLoading ? '' : 'Loading'}
                      >
                        Unblock
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
BlockedSettingsPage.displayName = 'BlockedSettingsPage';

export default BlockedSettingsPage;
