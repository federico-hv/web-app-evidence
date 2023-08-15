import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Head,
  TextGroup,
  TextGroupSubheading,
  useMenuNavigate,
} from '../../shared';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import { SuggestionsCard } from '../../features';
import millify from 'millify';

function Statistic({ value, label }: { value: number; label: string }) {
  return (
    <TextGroup direction='horizontal' flex={0}>
      <TextGroupSubheading weight={500}>
        {millify(value)}
      </TextGroupSubheading>
      <TextGroupSubheading color='base400'>{label}</TextGroupSubheading>
    </TextGroup>
  );
}

function FeedPage() {
  const { id } = useParams();
  const { goto } = useMenuNavigate();

  return (
    <ContentLayout>
      <ContentLayoutMain>
        <Head
          prefix=''
          title='Whatever is said on the feed card.'
          description={'Whatever is said on the feed card.'}
        />
        <Box borderBottom={2} borderColor='base100'>
          <Container maxWidth={600} py={4}>
            <HStack items='center' gap={3}>
              <IconButton
                onClick={goto.home}
                variant='ghost'
                icon='arrow-left-outline'
                ariaLabel='go back'
              />
              <Heading size={4} weight={500} as='h2'>
                Feed
              </Heading>
            </HStack>
          </Container>
        </Box>
        {id && (
          <VStack>
            <Box borderBottom={2} borderColor='base100'>
              <Container maxWidth={600} py={4} borderColor='base100'>
                <VStack gap={5} w='full'>
                  <HStack justify='space-between'>
                    <HStack gap={3}>
                      <Avatar size='xl' src='' name='displayname' />
                      <TextGroup gap={1}>
                        <TextGroupSubheading weight={500}>
                          DisplayName
                        </TextGroupSubheading>
                        <TextGroupSubheading
                          size={2}
                          weight={500}
                          color='base400'
                        >
                          Username
                        </TextGroupSubheading>
                      </TextGroup>
                    </HStack>
                    <IconButton
                      variant='ghost'
                      icon='more-fill'
                      ariaLabel='options'
                    />
                  </HStack>
                  <VStack gap={4}>
                    <Text>Description</Text>
                    <Text>Images/Polls</Text>
                  </VStack>
                  <HStack
                    gap={5}
                    p={4}
                    bgColor='base100'
                    w='full'
                    radius={3}
                  >
                    <Statistic value={5000003} label='Views' />
                    <Statistic value={100000} label='Reactions' />
                    <Statistic value={4093} label='Bookmarks' />
                  </HStack>
                  <HStack gap={5}>
                    <IconButton
                      variant='ghost'
                      icon='reaction-add'
                      ariaLabel='react'
                      size='lg'
                    />
                    <IconButton
                      variant='ghost'
                      icon='bookmark-outline'
                      ariaLabel='bookmark'
                      size='lg'
                    />
                    <IconButton
                      variant='ghost'
                      icon='share-outline'
                      ariaLabel='share'
                      size='lg'
                    />
                  </HStack>
                </VStack>
              </Container>
            </Box>
          </VStack>
        )}
      </ContentLayoutMain>
      <ContentLayoutAside>
        <SuggestionsCard />
      </ContentLayoutAside>
    </ContentLayout>
  );
}

FeedPage.displayName = 'FeedPage';

export default FeedPage;
