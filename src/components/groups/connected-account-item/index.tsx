import { Button, HStack, Image, Text, VStack } from '@holdr-ui/react';
import { ConnectedAccountItemProps } from './connected-account-item.type';
import { Provider } from 'shared';

function ConnectedAccountItem({
  provider: name,
  email,
}: ConnectedAccountItemProps) {
  const providerItem = Provider[name];
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
        <Image
          size={25}
          src={providerItem.image}
          alt={`${providerItem.name} logo`}
        />
        <VStack gap={2}>
          <Text>{providerItem.name}</Text>
          <HStack gap={2} items='center'>
            <Text size={2} color='base400'>
              {email}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Button size='sm' colorTheme='danger' variant='ghost'>
        Disconnect
      </Button>
    </HStack>
  );
}
ConnectedAccountItem.displayName = 'ConnectedAccountItem';

export default ConnectedAccountItem;
