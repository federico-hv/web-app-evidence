import { FeedModel } from '../../../features';
import { LinkText, prefix, useGeneralContext } from '../../../shared';
import { Heading, VStack } from '@holdr-ui/react';

function Header() {
  const { state }: { state: FeedModel } = useGeneralContext<FeedModel>();

  return (
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
  );
}
Header.displayName = 'FeedHeader';

export default Header;
