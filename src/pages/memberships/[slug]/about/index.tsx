import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from '@holdr-ui/react';
import { CreateMembershipItem } from '../ui';
import {
  IAnnouncement,
  makeButtonLarger,
  makePath,
  useNavigateWithPreviousLocation,
  voidFn,
} from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';
import dayjs from 'dayjs';
import { dummyPerks } from '../../../clubs/shared';
import { dummyPerksData } from '../../../clubs';
import { useLocation, useParams } from 'react-router-dom';

const imageSrcs = [
  'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  'https://avatar.iran.liara.run/public/boy?username=Ash',
  'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk',
  'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  'https://avatar.iran.liara.run/public/boy?username=Ash',
];

const dummyAnnouncements: IAnnouncement[] = [
  {
    createdAt: dayjs().subtract(1, 'd').toDate(),
    id: 2,
    description:
      'Lorem ipsum dolor sit amet consectetur. Aliquet a euismod turpis fames sed id pharetra massa morbi. Lacus dui cursus sed nibh amet nunc eget id. Facilisis vehicula scelerisque nunc bibendum convallis scelerisque amet at. Pulvinar viverra habitant integer integer nam. Ac diam pharetra tortor penatibus ac. Pellentesque enim nulla augue volutpat. Nunc ullamcorper enim nulla mollis elementum pellentesque mi posuere commodo. Consequat ut semper posuere aliquet augue libero quis quisque. Egestas a eget hendrerit blandit morbi sit blandit nisi.',
  },
  {
    createdAt: dayjs().subtract(4, 'd').toDate(),
    id: 1,
    description:
      'Lorem ipsum dolor sit amet consectetur. Aliquet a euismod turpis fames sed id pharetra massa morbi. Lacus dui cursus sed nibh amet nunc eget id. Facilisis vehicula scelerisque nunc bibendum convallis scelerisque amet at. Pulvinar viverra habitant integer integer nam. Ac diam pharetra tortor penatibus ac. Pellentesque enim nulla augue volutpat. Nunc ullamcorper enim nulla mollis elementum pellentesque mi posuere commodo. Consequat ut semper posuere aliquet augue libero quis quisque. Egestas a eget hendrerit blandit morbi sit blandit nisi.',
  },
];

function MembershipAboutPage() {
  const { slug } = useParams();

  const location = useLocation();
  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const goto = (path: string[]) =>
    navigate(makePath(['memberships', slug ?? '', ...path]));

  return (
    <Container maxWidth={1280}>
      <VStack w='full' pb={10}>
        <VStack>
          <VStack gap={4}>
            <HStack items='center' gap={4}>
              <Heading size={6} weight={500} mb={0}>
                Welcome
              </Heading>
              <IconButton
                onClick={() => goto(['add', 'welcome-message'])}
                size='sm'
                colorTheme='white100'
                icon='edit-fill'
                ariaLabel='edit '
              />
            </HStack>
            {/*<Text>*/}
            {/*  Get access to exclusive tracks and early releases before*/}
            {/*  anyone else. Be the first to hear new songs, dive into*/}
            {/*  behind-the-scenes content, and enjoy special surprises just*/}
            {/*  for you!*/}
            {/*</Text>*/}
          </VStack>
        </VStack>
        <Box h='1px' w='100%' bgColor='base200' my='64px' />
        <VStack gap={4}>
          <HStack items='center' gap={4}>
            <Heading size={6} weight={500} mb={0}>
              Rules & Guidelines
            </Heading>
            <IconButton
              onClick={() => goto(['add', 'rules-and-guidelines'])}
              size='sm'
              colorTheme='white100'
              icon='edit-fill'
              ariaLabel='edit '
            />
          </HStack>
          <CreateMembershipItem
            text='Add Rules & Guidelines'
            onClick={() => goto(['add', 'rules-and-guidelines'])}
          />
          <Box
            p={8}
            radius={3}
            css={{
              boxShadow: '0px 0px 15px 0px #00000026',
            }}
          >
            Please remember that any exclusive songs, links, or codes
            provided to you are for your personal enjoyment only. Sharing
            or leaking this exclusive content outside of the members-only
            community is strictly prohibited. Respecting these guidelines
            helps maintain the integrity and special nature of our
            community, ensuring that all members continue to receive unique
            and privileged access.
          </Box>
        </VStack>
        <VStack mt={8} gap={4}>
          <Heading size={6} weight={500}>
            Announcements
          </Heading>
          <Box
            radius={3}
            css={{
              boxShadow: '0px 0px 15px 0px #00000026',
            }}
          >
            <FlatList
              direction='vertical'
              divider={<Separator bgColor='success700' thickness={1} />}
              data={dummyAnnouncements}
              keyExtractor={(announcement) => announcement.id}
              renderItem={(announcement) => (
                <VStack p={8} gap={2}>
                  <Heading
                    as='h2'
                    size={1}
                    weight={300}
                    color='#B1B1B1
'
                  >
                    {dayjs(announcement.createdAt).format('MMM D, YYYY')}
                  </Heading>
                  <Text>{announcement.description}</Text>
                </VStack>
              )}
            />
          </Box>
        </VStack>
        <VStack mt={8} gap={4}>
          <Heading size={6} weight={500}>
            Club Members
          </Heading>
          <HStack
            items='center'
            justify='space-between'
            p={8}
            radius={3}
            css={{
              boxShadow: '0px 0px 15px 0px #00000026',
            }}
          >
            <AvatarGroup max={7} borderColor='#FFF' size='56px'>
              {imageSrcs.map((item) => (
                <Avatar key={item} src={item} name='Micky Weekes'>
                  <AvatarBadge
                    zIndex={1}
                    borderColor='#292940'
                    border={1}
                    bgColor='#34C05A'
                    r={10}
                    b={5}
                    size='12px'
                    radius='full'
                  />
                </Avatar>
              ))}
            </AvatarGroup>
            <Button
              onClick={() => goto(['members'])}
              radius={1}
              colorTheme='purple500'
              className={makeButtonLarger('2.75rem')}
              css={{ px: '18px' }}
            >
              View all
            </Button>
          </HStack>
        </VStack>
        <VStack mt={8} gap={4}>
          <Heading size={6} weight={500}>
            Membership Perks
          </Heading>
          <Box
            radius={3}
            css={{
              boxShadow: '0px 0px 15px 0px #00000026',
            }}
          >
            <FlatList
              direction='vertical'
              divider={<Separator bgColor='success700' thickness={1} />}
              data={dummyPerksData}
              keyExtractor={(perk) => perk.id}
              renderItem={(perk) => (
                <VStack p={8} gap={2}>
                  <Heading as='h2' size={4} weight={500}>
                    {perk.label}
                  </Heading>
                  <Text size={2} color='black300'>
                    {perk.description}
                  </Text>
                </VStack>
              )}
            />
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
}

export default MembershipAboutPage;
