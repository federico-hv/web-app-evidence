import { Box, Button, HStack, Image } from '@holdr-ui/react';
import {
  changeDimensions,
  TextGroup,
  TextGroupSubheading,
  useToast,
} from '../../../../../../shared';
import { ConnectedAccountProps } from './types';
import { Fragment } from 'react';
import { useRemoveConnectedAccount } from '../../../../../../features';
import dayjs from 'dayjs';

function ConnectedAccount({
  id,
  provider: name,
  connectedOn,
}: ConnectedAccountProps) {
  const { removeConnectedAccount, loading, error } =
    useRemoveConnectedAccount();

  const { openWith } = useToast();

  const providerItem = ReleasesUtility.getProviderItem(name);

  if (!providerItem) {
    return <Fragment />;
  }

  if (error) {
    openWith({ status: 'danger', description: error.message });
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
            Connected on {dayjs(connectedOn, 'X').format('MMMM YYYY')}
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
      <Button
        onClick={() => removeConnectedAccount(id)}
        className={changeDimensions({ width: '6rem', height: '2rem' })}
        isLoading={loading}
        loadingText={loading ? '' : 'disconnect'}
        size='sm'
        colorTheme='danger400'
        variant='ghost'
      >
        Disconnect
      </Button>
    </HStack>
  );
}
ConnectedAccount.displayName = 'Index';

export default ConnectedAccount;
