import { useCurrentUser } from '../../../../auth';
import { Fragment } from 'react';
import { Box, Button, Heading, VStack } from '@holdr-ui/react';
import { makeButtonLarger, Paths, prefix } from '../../../../../shared';
import { Link } from 'react-router-dom';
import { MembershipItem } from '../../membership-item';
import { dummyOwnedMembershipData, dummyOwnedMembershipData2 } from '../../../../../pages/clubs/shared';

function MyMemberships() {
  const currentUser = useCurrentUser();

  if (!currentUser || (currentUser && currentUser.role === 'artist')) {
    return <Fragment />;
  }

  return (
    <VStack as='nav' p={4}>
      <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
        My Memberships
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
      <Link to={prefix('/', Paths.clubs)}>
        {/* <Button
          fullWidth
          className={makeButtonLarger('2.5rem')}
          colorTheme='purple500'
        >
          Browse Clubs
        </Button> */}
        <VStack gap={3}>
          <MembershipItem data={dummyOwnedMembershipData}/>
          <MembershipItem data={dummyOwnedMembershipData}/>
          <MembershipItem data={dummyOwnedMembershipData2}/>
        </VStack>
      </Link>
    </VStack>
  );
}
MyMemberships.displayName = 'MyMemberships';

export default MyMemberships;
