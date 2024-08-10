import { Box, Button, HStack, Icon, Image, Text } from '@holdr-ui/react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';
import { useConnectedAccountsSuspenseQuery } from '../../../../features';
import { IConnectedAccount } from '../../../../features';

function ConnectedAccountItem({ data }: { data: IConnectedAccount }) {
  return (
    <HStack justify='space-between' items='center'>
      <HStack items='center' gap={3}>
        <Image
          size={50}
          radius={1}
          css={{
            background: 'rgba(152, 152, 255, 0.15)',
            flexShrink: 0,
          }}
        />
        <TextGroup gap={0}>
          <TextGroupHeading size={3} as='h5'>
            {data.provider}
          </TextGroupHeading>
          {/*<TextGroupSubheading size={2} color='white700' weight={500}>*/}
          {/*  username@mail.com*/}
          {/*</TextGroupSubheading>*/}
        </TextGroup>
      </HStack>
      <Button
        disabled
        size='sm'
        colorTheme='white700'
        variant='ghost'
        radius={1}
        css={{
          padding: '14px',
        }}
      >
        Disconnect
      </Button>
    </HStack>
  );
}

function ConnectedAccountsList() {
  const { data } = useConnectedAccountsSuspenseQuery();

  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Connected accounts
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Manage all your other accounts that are connected to your Holdr
          account
        </TextGroupSubheading>
      </TextGroup>
      <Box
        border={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        bgColor='rgba(48, 48, 75, 0.6)'
        py={5}
        px={4}
        radius={3}
        mt={4}
      >
        {data.connectedAccounts.edges.length === 0 ? (
          <Text color='white700' as='em'>
            No connected accounts
          </Text>
        ) : (
          <FlatList
            data={data.connectedAccounts.edges}
            keyExtractor={({ node }) => node.id}
            renderItem={({ node }) => <ConnectedAccountItem data={node} />}
            gap={5}
            divider={
              <Box
                h='1px'
                w='full'
                bgColor='rgba(152, 152, 255, 0.05)
'
              />
            }
          />
        )}
      </Box>
    </Box>
  );
}
ConnectedAccountsList.displayName = 'ConnectedAccountsList';

export default ConnectedAccountsList;
