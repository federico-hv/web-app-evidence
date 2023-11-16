import { Box, Button, HStack, Image } from '@holdr-ui/react';
import { TextGroup, TextGroupSubheading } from '../../../../../../shared';
import { ConnectedAccountProps } from './types';
import { Fragment } from 'react';
import { ReleasesUtility } from '../../../../../../features';

function ConnectedAccount({
  provider: name,
  connectedOn,
}: ConnectedAccountProps) {
  const providerItem = ReleasesUtility.getProviderItem(name);

  if (!providerItem) {
    return <Fragment />;
  }

  return (
    <HStack
      px={4}
      py={4}
      items='center'
      justify='space-between'
      borderBottom={2}
      borderColor='base100'
    >
      <HStack gap={5} items='center'>
        <Box>
          <Image
            size={30}
            src={providerItem.image}
            alt={`${providerItem.name} logo`}
          />
        </Box>
        <TextGroup gap={1}>
          <TextGroupSubheading weight={500}>
            {providerItem.name}
          </TextGroupSubheading>
          <TextGroupSubheading size={2} color='base400'>
            {connectedOn}
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
      <Button size='sm' colorTheme='danger' variant='ghost'>
        Disconnect
      </Button>
    </HStack>
  );
}
ConnectedAccount.displayName = 'Index';

export default ConnectedAccount;
