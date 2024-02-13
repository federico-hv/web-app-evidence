import { Avatar, Box, HStack, Text, VStack } from '@holdr-ui/react';
import {
  RadialSurface,
  TextGroup,
  TextGroupSubheading,
} from '../../../shared';
import { useCurrentUser } from '../../auth';
import { useSuspenseQuery } from '@apollo/client';
import { GET_PROFILE_SUMMARY } from '../queries';
import { Fragment } from 'react';

function Members() {
  return (
    <HStack gap={2}>
      <Text size={2}>0</Text>
      <Text size={2} color='base300'>
        Members
      </Text>
    </HStack>
  );
}

function Memberships() {
  return (
    <HStack gap={2}>
      <Text size={2}>0</Text>
      <Text size={2} color='base300'>
        Memberships
      </Text>
    </HStack>
  );
}

interface FollwingSummary {
  followers: { total: number };
  following: { total: number };
}

function ProfileSummary() {
  const currentUser = useCurrentUser();
  const { data } = useSuspenseQuery<FollwingSummary, { username: string }>(
    GET_PROFILE_SUMMARY,
    { variables: { username: currentUser?.username || '' } },
  );

  if (!currentUser) {
    return <Fragment />;
  }

  return (
    <RadialSurface radius={4} h={117} w='100%'>
      <VStack
        gap={3}
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
        <HStack items='center' gap={3} w='100%' h='100%' pt={4} px={4}>
          <Avatar
            src={currentUser.avatar}
            name={''}
            css={{ size: '50px' }}
          />
          <TextGroup gap={1}>
            <TextGroupSubheading size={3} weight={500}>
              {currentUser.displayName}
            </TextGroupSubheading>
            <TextGroupSubheading size={2} color='base300'>
              {currentUser.username}
            </TextGroupSubheading>
          </TextGroup>
        </HStack>
        <HStack pb={4} px={4} w='100%' h='100%' justify='space-between'>
          {currentUser?.role === 'artist' ? <Members /> : <Memberships />}
          <HStack gap={2}>
            <Text size={2}>{data.followers.total}</Text>
            <Text size={2} color='base300'>
              Followers
            </Text>
          </HStack>
          <HStack gap={2}>
            <Text size={2}>{data.following.total}</Text>
            <Text size={2} color='base300'>
              Following
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </RadialSurface>
  );
}
ProfileSummary.displayName = 'ProfileSummary';
export default ProfileSummary;
