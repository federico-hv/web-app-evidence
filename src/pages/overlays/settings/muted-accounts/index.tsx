import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  makeButtonLarger,
  makePath,
  Paths,
  TextGroup,
} from '../../../../shared';
import { Empty } from '../ui';
import { FlatList } from '../../../../tmp/flat-list';
import {
  useMutedUsersSuspenseQuery,
  useRemoveRelationshipAction,
  UserWithRelationship,
} from '../../../../features';

function MutedUser({ data }: { data: UserWithRelationship }) {
  const { unmute, loading } = useRemoveRelationshipAction();

  return (
    <HStack justify='space-between' items='center'>
      <HStack gap={3} items='center'>
        <Avatar src={data.avatar} name={data.displayName} size={40} />
        <TextGroup gap={0}>
          <Text weight={600}>{data.displayName}</Text>
          <Text color='white700' size={1} weight={500}>
            @{data.username}
          </Text>
        </TextGroup>
      </HStack>
      <Button
        onClick={async () => await unmute(data.username)}
        isLoading={loading}
        loadingText='Unmute'
        variant='outline'
        className={makeButtonLarger('2rem')}
        colorTheme='purple50'
        css={{ px: '$4' }}
      >
        Unmute
      </Button>
    </HStack>
  );
}

function MutedAccountsPage() {
  const { data } = useMutedUsersSuspenseQuery();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <VStack
      h={600}
      gap={4}
      pb={10}
      overflow='hidden'
      px={5}
      divider={<Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.1)' />}
    >
      <HStack justify='space-between' pt={5}>
        <Heading size={6} weight={500}>
          Muted Accounts
        </Heading>
        <CloseButton
          onClick={() =>
            navigate(
              location.state.previousLocation ??
                makePath([Paths.settings, Paths.setting.privacy]),
            )
          }
          variant='outline'
          colorTheme='white500'
          css={{
            height: '1.5rem !important',
            width: '1.5rem !important',
          }}
        />
      </HStack>
      <VStack
        className='thin-scrollbar'
        overflowY='auto'
        flex={1}
        justify='space-between'
      >
        {data.mutedUsers.total === 0 ? (
          <Empty
            subtitle='All the accounts that you have muted will appear here.'
            title='No muted accounts'
          />
        ) : (
          <FlatList
            css={{ paddingInlineEnd: '$3' }}
            gap={4}
            direction='vertical'
            data={data.mutedUsers.edges}
            renderItem={({ node }) => <MutedUser data={node} />}
            keyExtractor={({ node }) => node.id}
          />
        )}
      </VStack>
    </VStack>
  );
}

export default MutedAccountsPage;
