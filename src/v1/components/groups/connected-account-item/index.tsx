import { Box, Button, HStack, Image } from '@holdr-ui/react';
import { ConnectedAccountItemProps } from './connected-account-item.type';
import { Provider } from '../../../shared';
import TextGroup, { TextGroupSubheading } from '../text';

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
            {email}
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
      <Button size='sm' colorTheme='danger' variant='ghost'>
        Disconnect
      </Button>
    </HStack>
  );
}
ConnectedAccountItem.displayName = 'ConnectedAccountItem';

export default ConnectedAccountItem;
