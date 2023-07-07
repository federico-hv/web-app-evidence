import { HeaderLayout } from '../../../layouts';
import {
  ContentBox,
  Head,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  Error,
  TextGroupSubheading,
} from '../../../components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { IUser, LinkOverlay, Paths } from '../../../shared';
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
import { useQuery } from '@apollo/client';
import { GET_MUTED_ACCOUNTS } from '../../../lib';
import { useRemoveRelationshipAction } from '../../../hooks';

function User({ data }: { data: IUser }) {
  const { unmute, loading } = useRemoveRelationshipAction(data.username);

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
        onClick={unmute}
        isLoading={loading}
        loadingText={loading ? '' : 'Unmute'}
      >
        Unmute
      </Button>
    </HStack>
  );
}

function MutedSettingsPage() {
  const { data, loading, error } = useQuery<{ mutedUsers: IUser[] }>(
    GET_MUTED_ACCOUNTS,
    { fetchPolicy: 'cache-and-network' },
  );

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
                <ContentBox>Nothing to display</ContentBox>
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
MutedSettingsPage.displayName = 'MutedSettingsPage';

export default MutedSettingsPage;
