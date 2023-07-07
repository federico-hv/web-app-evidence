import {
  Avatar,
  AvatarGroup,
  Box,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { TextGroup, TextGroupSubheading } from '../../../packages';

function RelationshipsCard() {
  return (
    <VStack
      w='100%'
      bgColor='base100'
      radius={4}
      divider={<Box borderBottom={1} borderColor='primary400' />}
    >
      <HStack p={4}>
        <TextGroup gap={1}>
          <TextGroupSubheading size={4} weight={600}>
            100m
          </TextGroupSubheading>
          <TextGroupSubheading weight={500} color='base400'>
            Followers
          </TextGroupSubheading>
        </TextGroup>
        <TextGroup gap={1}>
          <TextGroupSubheading size={4} weight={600}>
            100k
          </TextGroupSubheading>
          <TextGroupSubheading weight={500} color='base400'>
            Following
          </TextGroupSubheading>
        </TextGroup>
        <TextGroup gap={1}>
          <TextGroupSubheading size={4} weight={600}>
            432
          </TextGroupSubheading>
          <TextGroupSubheading weight={500} color='base400'>
            Members
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
      <HStack items='center' p={4} gap={3}>
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
    </VStack>
  );
}
RelationshipsCard.displayName = 'RelationshipsCard';

export default RelationshipsCard;
