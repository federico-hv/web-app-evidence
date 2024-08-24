import { useCurrentUser } from '../../../../auth';
import { Fragment } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  VStack,
} from '@holdr-ui/react';
import {
  GQLRenderer,
  makeButtonLarger,
  Paths,
  prefix,
} from '../../../../../shared';
import { Link } from 'react-router-dom';
import { useUserMembershipsSuspenseQuery } from '../../../../memberships';
import { FlatList } from '../../../../../tmp/flat-list';
import { MembershipItem } from '../../groups/membership-item';

function InfoItem({ description }: { description: string }) {
  return (
    <HStack
      items='center'
      gap={2}
      radius={1}
      p={3}
      fontWeight={500}
      fontSize={2}
      bgColor='rgba(152,152,255,0.2)'
    >
      <Icon name='information-outline' />
      {description}
    </HStack>
  );
}

function BrowseMemberships() {
  return (
    <Link to={prefix('/', Paths.clubs)}>
      <Button
        fullWidth
        className={makeButtonLarger('2.5rem')}
        colorTheme='purple500'
      >
        Browse Clubs
      </Button>
    </Link>
  );
}

function MyMemberships() {
  const currentUser = useCurrentUser();

  if (!currentUser || (currentUser && currentUser.role === 'artist')) {
    return <Fragment />;
  }

  return (
    <VStack minHeight={292} p={4}>
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
      <GQLRenderer
        ErrorFallback={() => (
          <InfoItem description='Failed to load your memberships' />
        )}
      >
        <Content />
      </GQLRenderer>
    </VStack>
  );
}
MyMemberships.displayName = 'MyMemberships';

function Content() {
  const currentUser = useCurrentUser();

  const { data } = useUserMembershipsSuspenseQuery(currentUser.username, {
    take: 3,
  });

  return (
    <Fragment>
      {data.userMemberships.total === 0 ? (
        <BrowseMemberships />
      ) : (
        <FlatList
          direction='vertical'
          data={data.userMemberships.edges.slice(0, 3)}
          renderItem={(item) => <MembershipItem data={item.node} />}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </Fragment>
  );
}

export default MyMemberships;
