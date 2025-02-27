import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@holdr-ui/react';
import {
  extraBtnPadding,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';

function SuggestionsCard() {
  return (
    <VStack
      gap={6}
      w='100%'
      py={5}
      px={4}
      borderBottom={2}
      borderColor='base100'
    >
      <Box>
        <Heading as='h2' size={3}>
          Recommended Artists
        </Heading>
      </Box>
      <VStack gap={5}>
        <HStack gap={3} items='center'>
          <Avatar
            src='https://i.scdn.co/image/ab6761610000e5ebd2657bcafcb300d90816523f'
            variant='squircle'
          />
          <TextGroup gap={0}>
            <TextGroupHeading as='h3' size={3}>
              Kehlani
            </TextGroupHeading>
            <TextGroupSubheading color='base400' size={2}>
              @kehlani
            </TextGroupSubheading>
          </TextGroup>
          <Flex flex={1} justify='flex-end'>
            <Button>Follow</Button>
          </Flex>
        </HStack>
        <HStack gap={3} items='center'>
          <Avatar
            src='https://i.scdn.co/image/ab6761610000e5eb99e4fca7c0b7cb166d915789'
            variant='squircle'
          />
          <TextGroup gap={0}>
            <TextGroupHeading as='h3' size={3}>
              Rihanna
            </TextGroupHeading>
            <TextGroupSubheading color='base400' size={2}>
              @rihanna
            </TextGroupSubheading>
          </TextGroup>
          <Flex flex={1} justify='flex-end'>
            <Button>Follow</Button>
          </Flex>
        </HStack>
        <HStack gap={3} items='center'>
          <Avatar
            src='https://i.scdn.co/image/ab6761610000e5eba4662f07a334ca261bc54504'
            variant='squircle'
          />
          <TextGroup gap={0}>
            <TextGroupHeading as='h3' size={3}>
              Dame D.O.L.L.A
            </TextGroupHeading>
            <TextGroupSubheading color='base400' size={2}>
              @damedollar
            </TextGroupSubheading>
          </TextGroup>
          <Flex flex={1} justify='flex-end'>
            <Button>Follow</Button>
          </Flex>
        </HStack>
        <Button className={extraBtnPadding()} variant='ghost'>
          View More
        </Button>
      </VStack>
    </VStack>
  );
}
SuggestionsCard.displayName = 'SuggestionsCard';

export default SuggestionsCard;
