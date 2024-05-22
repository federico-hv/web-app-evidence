import { Avatar, Box, HStack, Text, VStack } from '@holdr-ui/react';
import {
  RadialSurface,
  TextGroup,
  TextGroupSubheading,
} from '../../../shared';
import { useCurrentUser } from '../../auth';
import { useSuspenseQuery } from '@apollo/client';
import { Fragment } from 'react';
import millify from 'millify';
import { GET_RELATIONSHIP_COUNT } from '../../relationships';

function Members() {
  return (
    <TextGroup w='fit-content' direction='horizontal' gap={1}>
      <TextGroupSubheading size={1}>
        {millify(0, { precision: 2 })}
      </TextGroupSubheading>
      <TextGroupSubheading size={1} color='base300'>
        Members
      </TextGroupSubheading>
    </TextGroup>
  );
}

function Memberships() {
  return (
    <TextGroup w='fit-content' direction='horizontal' gap={1}>
      <TextGroupSubheading size={1}>
        {millify(0, { precision: 2 })}
      </TextGroupSubheading>
      <TextGroupSubheading size={1} color='base300'>
        Memberships
      </TextGroupSubheading>
    </TextGroup>
  );
}

interface FollowingSummary {
  followers: { total: number };
  following: { total: number };
}

function ProfileSummary() {
  const currentUser = useCurrentUser();
  const { data } = useSuspenseQuery<
    FollowingSummary,
    { username: string }
  >(GET_RELATIONSHIP_COUNT, {
    variables: { username: currentUser?.username || '' },
  });

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
          <TextGroup w='fit-content' direction='horizontal' gap={1}>
            <TextGroupSubheading size={1}>
              {millify(data.followers.total, { precision: 2 })}
            </TextGroupSubheading>
            <Text size={1} color='base300'>
              Followers
            </Text>
          </TextGroup>
          <TextGroup w='fit-content' direction='horizontal' gap={1}>
            <TextGroupSubheading size={1}>
              {millify(data.following.total, { precision: 2 })}
            </TextGroupSubheading>
            <TextGroupSubheading size={1} color='base300'>
              Following
            </TextGroupSubheading>
          </TextGroup>
        </HStack>
      </VStack>
    </RadialSurface>
  );
}
ProfileSummary.displayName = 'ProfileSummary';
export default ProfileSummary;
