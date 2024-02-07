import { useCurrentUser } from '../../auth';
import { Fragment } from 'react';
import { Box, Button, Heading, VStack } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../shared';

function MyMembershipList() {
  const currentUser = useCurrentUser();

  if (!currentUser || (currentUser && currentUser.role === 'artist')) {
    return <Fragment />;
  }

  return (
    <VStack as='nav' p={4}>
      <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
        My memberships
      </Heading>
      <Box
        mt={{ '@bp1': '8px', '@bp3': '8px' }}
        mb={{ '@bp1': '16px', '@bp3': '16px' }}
        h='1px'
        w='100%'
        css={{
          backgroundColor: 'rgba(152, 152, 255, 0.10)',
        }}
      />
      <Button
        fullWidth
        className={makeButtonLarger('2.5rem')}
        colorTheme='purple500'
      >
        Browse Clubs
      </Button>
    </VStack>
  );
}
MyMembershipList.displayName = 'MyMembershipList';

export default MyMembershipList;
