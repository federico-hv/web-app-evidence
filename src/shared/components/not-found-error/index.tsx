import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
} from '@holdr-ui/react';
import Head from '../head';
import { useNavigate } from 'react-router-dom';
import { Paths, prefix } from '../../index';

function NotFoundError() {
  const navigate = useNavigate();
  const openDiscover = () => navigate(prefix('/', Paths.discover));
  return (
    <>
      <Head
        title='Page Not Found'
        description="We do not have what you're looking for."
      />
      <Box h={{ '@bp1': '100vh', '@bp3': 'calc(100vh - 65px)' }} w='100%'>
        <Center
          borderLeft={2}
          borderColor='base100'
          h='100%'
          css={{ flexDirection: 'column' }}
        >
          <VStack
            gap={3}
            items='center'
            w={{ '@bp1': '100%', '@bp3': '70%' }}
            mb={5}
          >
            <Heading as='h1' weight={500} css={{ textAlign: 'center' }}>
              Oops, nothing here
            </Heading>
            <Text size={3} css={{ textAlign: 'center' }}>
              Unfortunately, we could not find what you are looking for. It
              has either been moved or we never had it. You can try to
              search for it
            </Text>
          </VStack>
          <Button
            onClick={openDiscover}
            variant='outline'
            label='Search'
          />
        </Center>
      </Box>
    </>
  );
}
NotFoundError.displayName = 'NotFoundError';

export default NotFoundError;
