import { ReleasesUtility } from '../shared';
import { Fragment } from 'react';
import { Box, Circle, HStack, Image, Text } from '@holdr-ui/react';
import { ConnectorProvider } from '../../connected-accounts';

function ConnectButton({
  provider,
  onClick,
}: {
  provider: ConnectorProvider;
  onClick: VoidFunction;
}) {
  const providerItem = ReleasesUtility.getProviderItem(provider);

  if (!providerItem) {
    return <Fragment />;
  }

  return (
    <HStack
      cursor='pointer'
      px={6}
      h={48}
      items='center'
      justify='space-between'
      border={2}
      borderColor='base100'
      radius='full'
      onClick={onClick}
      _hover={{ backgroundColor: '$base100' }}
    >
      <Circle size={20}>
        <Image
          src={providerItem.image}
          alt={`${providerItem.name} logo`}
        />
      </Circle>
      <Text weight={500}>Connect {providerItem.name}</Text>
      <Box />
    </HStack>
  );
}
ConnectButton.displayName = 'ConnectButton';

export default ConnectButton;
