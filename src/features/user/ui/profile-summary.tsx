import { Avatar, Box, HStack, Text, VStack } from '@holdr-ui/react';
import {
  makePath,
  RadialSurface,
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../shared';
import { useCurrentUser } from '../../auth';
import { Fragment } from 'react';
import millify from 'millify';
import { useSuspenseRelationshipCount } from '../../relationships';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useClubMembersSuspenseQuery,
  useUserMembershipsSuspenseQuery,
} from '../../memberships';
import { useSuspenseGetClub } from '../../clubs';

function Members() {
  const currentUser = useCurrentUser();

  const { data: clubData } = useSuspenseGetClub({
    slug: currentUser.username,
  });

  const { data: membersData } = useClubMembersSuspenseQuery(
    clubData.club.id,
  );

  const { pathname } = useLocation();
  const previousLocation = usePreviousLocation(pathname);

  return (
    <Link
      to={`/clubs/${currentUser.username}/members`}
      state={{ previousLocation }}
    >
      <TextGroup w='fit-content' direction='horizontal' gap={1}>
        <TextGroupSubheading size={1}>
          {millify(membersData.clubMembers.total, { precision: 2 })}
        </TextGroupSubheading>
        <TextGroupSubheading size={1} color='base300'>
          Members
        </TextGroupSubheading>
      </TextGroup>
    </Link>
  );
}

function Memberships() {
  const currentUser = useCurrentUser();

  const { pathname } = useLocation();
  const previousLocation = usePreviousLocation(pathname);

  const { data } = useUserMembershipsSuspenseQuery(currentUser.username);

  return (
    <Link
      to={`/${currentUser.username}/memberships`}
      state={{ previousLocation }}
    >
      <TextGroup w='fit-content' direction='horizontal' gap={1}>
        <TextGroupSubheading size={1}>
          {millify(data.userMemberships.total, { precision: 2 })}
        </TextGroupSubheading>
        <TextGroupSubheading size={1} color='base300'>
          Memberships
        </TextGroupSubheading>
      </TextGroup>
    </Link>
  );
}

function SummaryRelationshipCount({
  count,
  to,
}: {
  count: number;
  to: string;
}) {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <TextGroup
      onClick={() =>
        navigate(makePath([currentUser.username, to]), {
          state: {
            previousLocation: pathname,
          },
        })
      }
      w='fit-content'
      direction='horizontal'
      gap={1}
    >
      <TextGroupSubheading size={1}>
        {millify(count, { precision: 2 })}
      </TextGroupSubheading>
      <Text size={1} color='base300' casing='capitalize'>
        {to}
      </Text>
    </TextGroup>
  );
}

function ProfileSummary() {
  const currentUser = useCurrentUser();
  const { data } = useSuspenseRelationshipCount(currentUser.username);

  if (!currentUser) {
    return <Fragment />;
  }

  return (
    <RadialSurface radius={4} w='100%'>
      <VStack
        gap={2}
        w='100%'
        h='100%'
        divider={
          <Box
            minHeight='1px'
            w='calc(100% - $4)'
            mx={4}
            css={{
              background: 'rgba(152, 152, 255, 0.1)',
            }}
          />
        }
      >
        <HStack items='center' gap={2} w='100%' h='100%' pt={4} px={4}>
          <Avatar
            src={currentUser.avatar}
            name={currentUser.displayName}
            css={{ size: '50px' }}
          />
          <TextGroup w='fit-content' gap={0}>
            <TextGroupSubheading size={2} weight={500}>
              {currentUser.displayName}
            </TextGroupSubheading>
            <TextGroupSubheading size={1} color='base300'>
              {currentUser.username}
            </TextGroupSubheading>
          </TextGroup>
        </HStack>
        <HStack pb={4} px={4} w='100%' h='100%' justify='space-between'>
          {currentUser?.role === 'artist' ? <Members /> : <Memberships />}
          <SummaryRelationshipCount
            count={data.relationshipCount.followers}
            to='followers'
          />
          <SummaryRelationshipCount
            count={data.relationshipCount.following}
            to='following'
          />
        </HStack>
      </VStack>
    </RadialSurface>
  );
}
ProfileSummary.displayName = 'ProfileSummary';
export default ProfileSummary;
