import { useCurrentUser } from '../../../../auth';
import { Fragment } from 'react';
import { Box, Button, Heading, VStack } from '@holdr-ui/react';
import {
  GQLRenderer,
  makeButtonLarger,
  Paths,
  prefix,
} from '../../../../../shared';
import { Link } from 'react-router-dom';
import { useMyMembershipsSuspenseQuery } from '../../../../memberships';
import { FlatList } from '../../../../../tmp/flat-list';
import { MembershipItem } from '../../groups/membership-item';

function MyMemberships() {
  const currentUser = useCurrentUser();

  if (!currentUser || (currentUser && currentUser.role === 'artist')) {
    return <Fragment />;
  }

  return (
    <GQLRenderer>
      <Content />
    </GQLRenderer>
  );
}
MyMemberships.displayName = 'MyMemberships';

function Content() {
  const { data } = useMyMembershipsSuspenseQuery({ take: 3 });

  return (
    <VStack
      minHeight={data.myMemberships.total > 0 ? 330 : 292}
      as='nav'
      p={4}
    >
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
      {data.myMemberships.total === 0 ? (
        <Link to={prefix('/', Paths.clubs)}>
          <Button
            fullWidth
            className={makeButtonLarger('2.5rem')}
            colorTheme='purple500'
          >
            Browse Clubs
          </Button>
        </Link>
      ) : (
        <FlatList
          direction='vertical'
          data={data.myMemberships.edges}
          renderItem={(item) => <MembershipItem data={item.node} />}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </VStack>
  );
}

export default MyMemberships;
