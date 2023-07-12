import {
  Avatar,
  AvatarGroup,
  Box,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  Error,
  Loader,
  TextGroup,
  TextGroupSubheading,
} from '../../../shared';
import { useQuery } from '@apollo/client';
import { GET_SUGGESTIONS, GET_RELATIONSHIP_COUNT } from '../queries';
import { useParams } from 'react-router-dom';

function RelationshipsCard() {
  const { username } = useParams();

  const { loading, data, error } = useQuery<{
    relationshipCount: { followers: number; following: number };
  }>(GET_RELATIONSHIP_COUNT, {
    variables: { username },
  });

  const {
    loading: loadingSuggestions,
    data: suggestionsData,
    error: suggestionsError,
  } = useQuery<{ relationshipStatusInfo: { isOwned: boolean } }>(
    GET_SUGGESTIONS,
    {
      variables: { username },
    },
  );

  console.log(suggestionsData);

  return (
    <VStack
      w='100%'
      pb={5}
      pt={4}
      px={4}
      borderBottom={2}
      borderColor='base100'
    >
      <Error hasError={!!error} errorEl={<></>}>
        <Loader loading={loading}>
          {data && (
            <HStack>
              <TextGroup gap={1}>
                <TextGroupSubheading size={4} weight={600}>
                  {data.relationshipCount.followers}
                </TextGroupSubheading>
                <TextGroupSubheading weight={500} color='base400'>
                  Followers
                </TextGroupSubheading>
              </TextGroup>
              <TextGroup gap={1}>
                <TextGroupSubheading size={4} weight={600}>
                  {data.relationshipCount.following}
                </TextGroupSubheading>
                <TextGroupSubheading weight={500} color='base400'>
                  Following
                </TextGroupSubheading>
              </TextGroup>
              <TextGroup gap={1}>
                <TextGroupSubheading size={4} weight={600}>
                  0
                </TextGroupSubheading>
                <TextGroupSubheading weight={500} color='base400'>
                  Memberships
                </TextGroupSubheading>
              </TextGroup>
            </HStack>
          )}
        </Loader>
      </Error>
      <Error
        hasError={!!suggestionsError}
        errorMessage={suggestionsError?.message}
      >
        <Loader loading={loadingSuggestions}>
          {suggestionsData &&
            !suggestionsData.relationshipStatusInfo.isOwned && (
              <HStack mt={5} items='center' gap={3}>
                <AvatarGroup size='xs'>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </AvatarGroup>
                <Box
                  w='calc(100%-70px)'
                  title='Slim Jackson, Key Manko & 76 others follow this
                          artist'
                >
                  <Text size={1} noOfLines={1}>
                    Slim Jackson, Key Manko & 76 others follow this artist
                  </Text>
                </Box>
              </HStack>
            )}
        </Loader>
      </Error>
    </VStack>
  );
}
RelationshipsCard.displayName = 'RelationshipsCard';

export default RelationshipsCard;
