import {
  formatMoney,
  RadialSurface2,
  TextGroup,
  TextGroupSubheading,
} from '../../../shared';
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import { useMyMembersSuspenseQuery } from '../../../features';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Fragment } from 'react';

dayjs.extend(localizedFormat);

function ArtistProfileMembersPage() {
  return (
    <RadialSurface2 w='100%' h='100%' p={4} radius={3}>
      <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
        <Heading size={5} weight={400}>
          My Members
        </Heading>
      </Box>
      <MembersList />
    </RadialSurface2>
  );
}
ArtistProfileMembersPage.displayName = 'ArtistProfileMembersPage';

function MembersList() {
  const { data } = useMyMembersSuspenseQuery();

  return (
    <Fragment>
      {data.myMembers.total === 0 ? (
        <Center h='100%'>
          <Text size={2} weight={600} color='white600'>
            You do not have any members
          </Text>
        </Center>
      ) : (
        <VStack mt={6} gap={2}>
          <HStack gap={4}>
            <HStack gap={2} flex={1} items='center'>
              <Heading size={2} weight={600} color='white700'>
                Name
              </Heading>
              <Icon color='white700' size='xl' name='caret-down' />
            </HStack>
            <Box basis={125}>
              <Heading size={2} weight={600} color='white700'>
                Membership No.
              </Heading>
            </Box>
            <HStack gap={2} basis={200} items='center'>
              <Heading size={2} weight={600} color='white700'>
                Member Since
              </Heading>
              <Icon color='white700' size='xl' name='caret-down' />
            </HStack>
            <HStack gap={2} basis={200} items='center'>
              <Heading size={2} weight={600} color='white700'>
                Purchase Price
              </Heading>
              <Icon color='white700' size='xl' name='caret-down' />
            </HStack>
          </HStack>
          <FlatList
            direction='vertical'
            data={data.myMembers.edges}
            renderItem={(item) => (
              <HStack gap={4} items='center'>
                <Box flex={1} p={1}>
                  <HStack items='center' gap={3}>
                    <Avatar
                      name={item.node.user.displayName}
                      src={item.node.user.avatar}
                      size='40px'
                    >
                      {/*<AvatarBadge*/}
                      {/*  zIndex={1}*/}
                      {/*  size='12px'*/}
                      {/*  bgColor='success500'*/}
                      {/*  b={10}*/}
                      {/*  r={2}*/}
                      {/*  border={2}*/}
                      {/*  borderColor='rgb(43, 42, 60)'*/}
                      {/*/>*/}
                    </Avatar>
                    <TextGroup mb={2}>
                      <TextGroupSubheading size={3} weight={500}>
                        {item.node.user.displayName}
                      </TextGroupSubheading>
                      <TextGroupSubheading
                        color='white700'
                        mt={-5}
                        weight={300}
                        size={1}
                      >
                        @{item.node.user.username}
                      </TextGroupSubheading>
                    </TextGroup>
                  </HStack>
                </Box>
                <Box basis={125} p={1}>
                  <Text weight={300}>#{item.node.membership.number}</Text>
                </Box>
                <Box basis={200} p={1}>
                  <Text weight={300}>
                    {dayjs(item.node.membership.createdAt).format('ll')}
                  </Text>
                </Box>
                <Box basis={200} p={1}>
                  <Text weight={300}>
                    ${formatMoney(item.node.payment.amount)}
                  </Text>
                </Box>
              </HStack>
            )}
            keyExtractor={(item) => item.node.id}
          />
        </VStack>
      )}
    </Fragment>
  );
}

export default ArtistProfileMembersPage;
