import {
  Box,
  HStack,
  StackDivider,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { IProfile } from '../../../features';
import { Fragment } from 'react';
import { Head } from '../../../shared';
import { UserWatchlistItem } from './ui';

function UserWatchlistPage() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      <Head
        prefix={`${profile.displayName} - `}
        title='Watchlist'
        description="View the user's watchlist."
      />

      <VStack
        h='full'
        radius={2}
        mt={6}
        divider={
          <StackDivider width={1} color='rgba(152, 152, 255, 0.05)' />
        }
        bgColor='rgba(48, 48, 75, 0.60)'
      >
        <HStack p={4}>
          <Box flex={1}>
            <Text weight={500}>Club</Text>
          </Box>
          <Box basis='156px'>
            <Text weight={500}>Entry Price</Text>
          </Box>
          <Box basis='180px'>
            <Text weight={500}>Ends In</Text>
          </Box>
          <Box basis='108px'>
            <Text weight={500}>Status</Text>
          </Box>
          <Box basis='40px' />
        </HStack>
        <VStack h='calc(100%)' p={4} gap={5}>
          <UserWatchlistItem />
        </VStack>
      </VStack>
    </Fragment>
  );
}
UserWatchlistPage.displayName = 'UserWatchlistPage';

export default UserWatchlistPage;
