import { Button, Center, Heading, Text, VStack } from '@holdr-ui/react';
import { useNavigate } from 'react-router-dom';
import { prefix } from 'utilities';
import { Paths } from 'shared';

function NotFoundContent() {
  const navigate = useNavigate();
  const openDiscover = () => navigate(prefix('/', Paths.discover));
  return (
    <Center
      borderLeft={2}
      borderColor='base100'
      h='100%'
      css={{ flexDirection: 'column' }}
    >
      <VStack gap={3} items='center' w='70%' mb={5}>
        <Heading as='h1' weight={500}>
          Oops, nothing here
        </Heading>
        <Text size={3} css={{ textAlign: 'center' }}>
          Unfortunately, we could not find what you are looking for. It has
          either been moved or we never had it. You can try to search for
          it
        </Text>
      </VStack>
      <Button onClick={openDiscover} variant='outline' label='Search' />
    </Center>
  );
}
NotFoundContent.displayName = 'NotFoundContent';

export default NotFoundContent;
