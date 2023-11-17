import { ReleasesUtility } from '../shared';
import { Fragment } from 'react';
import {
  Box,
  Circle,
  HStack,
  Image,
  Skeleton,
  Text,
} from '@holdr-ui/react';
import {
  ConnectorProvider,
  useConnectedAccounts,
} from '../../connected-accounts';
import { dummyFn, GQLRenderer } from '../../../shared';
import { theme } from '../../../configs';

function ConnectButton({
  provider,
  onClick,
}: {
  provider: ConnectorProvider;
  onClick: VoidFunction;
}) {
  const providerItem = ReleasesUtility.getProviderItem(provider);
  const connectedAccounts = useConnectedAccounts([provider]);

  const isConnected = connectedAccounts.edges.find(
    ({ node }) => node.provider === provider,
  );

  if (!providerItem) {
    return <Fragment />;
  }

  return (
    <HStack
      as='button'
      px={6}
      h={48}
      items='center'
      justify='space-between'
      border={2}
      borderColor='base100'
      radius='full'
      bgColor={isConnected ? 'base100' : 'transparent'}
      onClick={isConnected ? dummyFn : onClick}
      _hover={{ backgroundColor: '$base100' }}
      css={{
        '&:active': {
          scale: isConnected ? 1 : 0.95,
        },
        cursor: isConnected ? 'not-allowed' : 'pointer',
        opacity: isConnected ? 0.5 : 1,
        transitionProperty: 'all',
        transitionDuration: theme.transitions['duration-normal'],
        transitionTimingFunction: 'ease',
      }}
    >
      <Circle size={{ '@bp1': 16, '@bp3': 20 }}>
        <Image
          loading='eager'
          src={providerItem.image}
          alt={`${providerItem.name} logo`}
        />
      </Circle>
      {!isConnected ? (
        <Text size={{ '@bp1': 2, '@bp3': 3 }} weight={500}>
          Connect {providerItem.name}
        </Text>
      ) : (
        <Text size={{ '@bp1': 2, '@bp3': 3 }} weight={500}>
          {providerItem.name} connected
        </Text>
      )}
      <Box />
    </HStack>
  );
}
ConnectButton.displayName = 'ConnectButton';

export default function Wrapper(props: {
  provider: ConnectorProvider;
  onClick: VoidFunction;
}) {
  return (
    <GQLRenderer
      ErrorFallback={() => <Fragment />}
      LoadingFallback={
        <Box h='48px' w='100%' radius='full' overflow='hidden'>
          <Skeleton h='100%' />
        </Box>
      }
    >
      <ConnectButton {...props} />
    </GQLRenderer>
  );
}
