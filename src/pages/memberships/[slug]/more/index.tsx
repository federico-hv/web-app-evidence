import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from '@holdr-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import {
  LinkOverlay,
  makePath,
  useNavigateWithPreviousLocation,
} from '../../../../shared';
import { CreateMembershipItem } from '../ui';
import { FlatList } from '../../../../tmp/flat-list';
import { dummyCustomPerks } from './shared';

export interface ICustomPerkLink {
  id: number;
  title: string;
  url: string;
  description: string;
}

export interface ICustomPerk {
  id: number;
  title: string;
  links: ICustomPerkLink[];
}

function MembershipMorePage() {
  const { slug } = useParams();

  const location = useLocation();
  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const gotoAddCustomPerk = () =>
    navigate(
      makePath(['memberships', slug ?? '', 'create', 'custom-perk']),
    );

  const gotoAddCustomMoreDescription = () =>
    navigate(
      makePath([
        'memberships',
        slug ?? '',
        'add',
        'custom-more-description',
      ]),
    );

  return (
    <Container maxWidth={1280}>
      <VStack
        w='full'
        pb={10}
        css={{
          gap: '56px',
        }}
      >
        <VStack>
          <VStack gap={4}>
            <HStack items='center' gap={4}>
              <Heading size={6} weight={400} mb={0}>
                More Perks
              </Heading>
              <IconButton
                onClick={gotoAddCustomMoreDescription}
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
        <CreateMembershipItem
          text='Add more perks'
          onClick={gotoAddCustomPerk}
        />
        <Box
          mt={4}
          radius={3}
          css={{
            boxShadow: '0px 0px 15px 0px #00000026',
          }}
        >
          <FlatList
            direction='vertical'
            divider={<Separator bgColor='success700' thickness={1} />}
            data={dummyCustomPerks}
            keyExtractor={(event) => event.id}
            renderItem={(event) => (
              <VStack p={8}>
                <Heading size={5} weight={600} color='purple800'>
                  {event.title}
                </Heading>
                <FlatList
                  mt={6}
                  pl={8}
                  gap={2}
                  direction='vertical'
                  data={event.links}
                  renderItem={(link) => (
                    <Box position='relative'>
                      <LinkOverlay target='_blank' to={link.url} />
                      <HStack gap={2}>
                        <Center
                          bgColor='white600'
                          fontSize={1}
                          px={2}
                          color='success700'
                          css={{
                            borderRadius: '2px',
                          }}
                        >
                          {link.title}
                        </Center>
                        <Center>
                          <Box h='1px' w='0.75rem' bgColor='black500' />
                        </Center>
                        <Text size={2}>{link.description}</Text>
                      </HStack>
                    </Box>
                  )}
                  keyExtractor={(link) => link.id}
                />
              </VStack>
            )}
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default MembershipMorePage;
