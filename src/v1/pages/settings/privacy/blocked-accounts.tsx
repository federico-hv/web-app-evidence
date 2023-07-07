import { HeaderLayout } from '../../../layouts';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { IUser, LinkOverlay, Paths } from '../../../shared';
import {
  Head,
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  ContentBox,
  TextGroup,
  TextGroupSubheading,
} from '../../../components';
import { useQuery } from '@apollo/client';
import { GET_BLOCKED_ACCOUNTS } from '../../../lib';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  VStack,
} from '@holdr-ui/react';
import { useRemoveRelationshipAction } from '../../../hooks';

function User({ data }: { data: IUser }) {
  const { removeBlock, loading } = useRemoveRelationshipAction(
    data.username,
  );

  return (
    <HStack
      gap={3}
      px={3}
      py={4}
      radius={2}
      items='center'
      _hover={{ backgroundColor: '$base100' }}
      position='relative'
    >
      <LinkOverlay to={prefix('/', data.username)} />
      <Avatar src={data.avatar} />
      <TextGroup gap={0}>
        <TextGroupSubheading weight={500}>
          {data.displayName}
        </TextGroupSubheading>
        <TextGroup.Subheading color='base400' size={2}>
          @{data.username}
        </TextGroup.Subheading>
      </TextGroup>
      <Button
        onClick={removeBlock}
        isLoading={loading}
        loadingText={loading ? '' : 'Unmute'}
      >
        Unblock
      </Button>
    </HStack>
  );
}

function BlockedSettingsPage() {
  const { data, loading, error } = useQuery<{ blockedUsers: IUser[] }>(
    GET_BLOCKED_ACCOUNTS,
    { fetchPolicy: 'cache-and-network' },
  );

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
                <ContentBox>Nothing to display</ContentBox>
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
                    <User key={item.id} data={item} />
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
