import { FeedContextProvider, FeedModel } from '../../../features';
import { LinkText, prefix, useGeneralContext } from '../../../shared';
import { Heading, HStack, VStack } from '@holdr-ui/react';
import MoreOptionsButton from './more-options.button';

function Header() {
  const { state } = useGeneralContext<FeedModel>();

  return (
    <HStack w='100%' justify='space-between' items='center'>
      <VStack>
        <Heading size={{ '@bp1': 3, '@bp3': 3 }} weight={500} as='h2'>
          Feed
        </Heading>
        <LinkText
          to={prefix('/', state.owner.username)}
          size={{ '@bp1': 1, '@bp3': 2 }}
          color='base400'
          weight={500}
          css={{
            textDecoration: 'unset',
          }}
        >
          @{state.owner.username}
        </LinkText>
      </VStack>
      <FeedContextProvider
        value={{
          bookmarked: state.bookmarked,
          isPinned: state.isPinned,
          owner: state.owner,
          feedId: state.id as string,
          reaction: state.reaction,
          createdAt: state.createdAt,
        }}
      >
        <MoreOptionsButton type={state.type} />
      </FeedContextProvider>
    </HStack>
  );
}
Header.displayName = 'FeedHeader';

export default Header;
