import {
  Button,
  Card,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  Avatar,
  StackDivider,
  AvatarBadge,
  Icon,
  Box,
  Heading,
  UnorderedList,
  List,
  AvatarGroup,
  Tag,
  useGeneralContext,
  Container,
} from '@holdr-ui/react';
import {
  ArtistClubPageRightPanel,
  ArtistProfileCard,
  ArtistProps,
} from './bio';

import { EmptyMessage, Loader, Error } from '../../../shared';
import {
  FeedCard,
  useFeedContext,
  useUserFeeds,
} from '../../../features/feeds';
import { IProfile } from '../../../pages/profile/shared';
import { FeedProvider } from '../../../pages/feed/shared/context';
import { useParams } from 'react-router-dom';

function Feeds({
  type,
  emptyMessage,
}: {
  type: 'article' | 'post';
  emptyMessage: { title: string; subtitle: string };
}) {
  const { slug } = useParams();

  const username = slug || '';
  const { loading, data, error } = useUserFeeds(username, type);

  console.log('SLUG: ', slug);

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading}>
        {data && data.userFeeds.count > 0 ? (
          <VStack gap={6} w='full' pb={6}>
            {data.userFeeds.data.map((item) => (
              <FeedCard key={item.id} data={item} />
            ))}
          </VStack>
        ) : (
          <EmptyMessage {...emptyMessage} />
        )}
      </Loader>
    </Error>
  );
}

function ArtistPost() {
  return (
    <Box radius={4} bg='#30304B' bgColor='pink'>
      <Card
        boxShadow='base'
        w='100%'
        minHeight={625}
        p={3}
        divider={
          <Box
            w={'100%'}
            h={'0.5px'}
            bgColor='purple300'
            css={{ opacity: '10%' }}
          />
        }
      >
        <Card.Header gap={3} direction='horizontal' py={1}>
          <VStack minHeight={'100%'} justify={'flex-end'}>
            <Avatar
              size='2xl'
              variant='squircle'
              src={imageSrcs[4]}
              name='Jade Lightning'
            />
          </VStack>
          <HStack flex={1} justify='space-between'>
            <VStack>
              <HStack>
                <Text weight={500}>Jade Lightning</Text>{' '}
                <VStack pl='6px' pt={'3px'}>
                  <Icon color='purple500' name='verified-fill' />
                </VStack>{' '}
              </HStack>
              <VStack gap={1}>
                <Text weight={500} size={1} color='base300'>
                  2 days ago
                </Text>
                <HStack>
                  <Tag size='sm' radius={1}>
                    <Tag.Label weight={500}>#ROCK</Tag.Label>
                  </Tag>
                </HStack>
              </VStack>
            </VStack>
            <IconButton
              variant='ghost'
              icon='more-fill'
              ariaLabel=''
              size={'xl'}
              colorTheme='base400'
            />
          </HStack>
        </Card.Header>
        <Card.Body gap={6} direction='vertical' py={5}>
          <Text color='white500'>
            Go check out my new album INFINITE SOLITUDE!
          </Text>
          <Image
            h='450px'
            w='100%'
            radius={3}
            src='https://geo-media.beatport.com/image_size/1400x1400/4cba1ea4-f65e-477d-9d00-0cef6d8f6bd6.jpg'
            alt='hi + lo cover art'
          />
        </Card.Body>
        <Card.Footer direction='horizontal' justify='space-around' pt={1}>
          <HStack w={'100%'}>
            <HStack flex={1}>
              <Button
                colorTheme='white500'
                variant='ghost'
                leftIcon='heart-outline'
                children='30'
              />
              <Button
                colorTheme='white500'
                variant='ghost'
                leftIcon='chat-alt-outline'
                children='15'
              />
              <Button
                colorTheme='white500'
                variant='ghost'
                leftIcon='send-outline'
                children='8'
              />
            </HStack>
            <HStack flex={1} justify={'flex-end'}>
              <Button
                colorTheme='white500'
                variant='ghost'
                leftIcon='bookmark-outline'
                children=''
              />
            </HStack>
          </HStack>
        </Card.Footer>
      </Card>
    </Box>
  );
}

ArtistPost.displayName = 'ArtistPost';

const imageSrcs = [
  'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  'https://avatar.iran.liara.run/public/boy?username=Ash',
  'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyQiewCK1xVeDg4hXiae0MaHWGE9SWqXVSoj87zJFrjshTTBSm',
];

type ArtistFeedProps = ArtistProps;
function ArtistFeed({
  socialLinks,
  isVerified,
  avatar,
  name,
}: ArtistFeedProps) {
  return (
    <HStack
      gap={4}
      justify={'space-between'}
      overflow='scroll'
      css={{ scrollbarWidth: 'thin' }}
    >
      <VStack flex={2} gap={4} maxHeight='h-screen' overflow='scroll'>
        <ArtistProfileCard
          p={'16px'}
          socialLinks={socialLinks}
          isVerified={isVerified}
          avatar={avatar}
          name={name}
        />
        <Feeds
          type='post'
          emptyMessage={{
            title: 'No posts',
            subtitle: `${name} has not yet created any posts.`,
          }}
        />
      </VStack>
      <ArtistClubPageRightPanel />
    </HStack>
  );
}

ArtistFeed.displayName = 'ArtistFeed';
export default ArtistFeed;
