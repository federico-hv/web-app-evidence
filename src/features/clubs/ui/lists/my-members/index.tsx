import { useCurrentUser } from '../../../../auth';
import { Fragment } from 'react';
import { Box, Button, Heading, HStack, VStack } from '@holdr-ui/react';
import { makeButtonLarger, makePath, Paths } from '../../../../../shared';
import { Link } from 'react-router-dom';
import { useClubMembersSuspenseQuery } from '../../../../memberships';
import { useSuspenseGetClub } from '../../../shared';
import { FlatList } from '../../../../../tmp/flat-list';
import { MyMemberItem } from '../../groups';

function MyMembers() {
  const currentUser = useCurrentUser();

  const { data: clubData } = useSuspenseGetClub({
    slug: currentUser.username,
  });

  const { data: membersData } = useClubMembersSuspenseQuery(
    clubData.club.id,
    { take: 4 },
  );

  if (!currentUser || (currentUser && currentUser.role === 'general')) {
    return <Fragment />;
  }

  return (
    <VStack minHeight={292} p={4}>
      <HStack items='center' justify='space-between'>
        <HStack items='center' gap={1}>
          <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
            My Members
          </Heading>
          {/*<InformationTooltip*/}
          {/*  sideOffset={5}*/}
          {/*  side='bottom'*/}
          {/*  description='These are your top members'*/}
          {/*/>*/}
        </HStack>
      </HStack>
      <Box
        mt={{ '@bp1': '8px', '@bp3': '8px' }}
        mb={{ '@bp1': '16px', '@bp3': '16px' }}
        h='1px'
        w='100%'
        css={{
          backgroundColor: 'rgba(152, 152, 255, 0.10)',
        }}
      />
      {membersData.clubMembers.total === 0 ? (
        <Link to={makePath([Paths.clubs, currentUser.username])}>
          <Button
            fullWidth
            className={makeButtonLarger('2.5rem')}
            colorTheme='purple500'
          >
            View Club
          </Button>
        </Link>
      ) : (
        <FlatList
          direction='vertical'
          gap={3}
          data={membersData.clubMembers.edges}
          renderItem={(item) => (
            <MyMemberItem data={item.node} isOnline={false} />
          )}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </VStack>
  );
}
MyMembers.displayName = 'MyMembers';

export default MyMembers;
