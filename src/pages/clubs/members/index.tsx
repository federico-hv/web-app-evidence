import {
  Avatar,
  AvatarBadge,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from '@holdr-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../shared';
import { FlatList } from '../../../tmp/flat-list';
import {
  useClubMembersSuspenseQuery,
  useSuspenseGetClub,
} from '../../../features';

const users = [
  {
    id: 1,
    displayName: 'Jane Doe',
    username: 'JaneDoe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    displayName: 'John Smith',
    username: 'JohnSmith',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    displayName: 'Alice Johnson',
    username: 'AliceJohnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    displayName: 'Bob Brown',
    username: 'BobBrown',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    displayName: 'Charlie Davis',
    username: 'CharlieDavis',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 6,
    displayName: 'David Wilson',
    username: 'DavidWilson',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 7,
    displayName: 'Eve Evans',
    username: 'EveEvans',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 8,
    displayName: 'Frank Garcia',
    username: 'FrankGarcia',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 9,
    displayName: 'Grace Martinez',
    username: 'GraceMartinez',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 10,
    displayName: 'Hank Lee',
    username: 'HankLee',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 11,
    displayName: 'Ivy Clark',
    username: 'IvyClark',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 12,
    displayName: 'Jack Lewis',
    username: 'JackLewis',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 13,
    displayName: 'Karen Young',
    username: 'KarenYoung',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 14,
    displayName: 'Leo Hall',
    username: 'LeoHall',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 15,
    displayName: 'Mona Allen',
    username: 'MonaAllen',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 16,
    displayName: 'Nina Wright',
    username: 'NinaWright',
    avatar: 'https://i.pravatar.cc/150?img=16',
  },
  {
    id: 17,
    displayName: 'Oscar Scott',
    username: 'OscarScott',
    avatar: 'https://i.pravatar.cc/150?img=17',
  },
  {
    id: 18,
    displayName: 'Paul Adams',
    username: 'PaulAdams',
    avatar: 'https://i.pravatar.cc/150?img=18',
  },
  {
    id: 19,
    displayName: 'Quinn Baker',
    username: 'QuinnBaker',
    avatar: 'https://i.pravatar.cc/150?img=19',
  },
  {
    id: 20,
    displayName: 'Rachel Harris',
    username: 'RachelHarris',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
];

function ClubMembersPage() {
  const { slug } = useParams();

  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation('/');

  const { data: clubData } = useSuspenseGetClub({
    slug: slug || '',
  });

  const { data: membersData } = useClubMembersSuspenseQuery(
    clubData.club.id,
    {
      take: 5,
    },
  );

  // go back to previous location if the user has account is protected or blocked

  return (
    <Dialog
      {...disclosure}
      onClose={() => navigate(location.state?.previousLocation || '/')}
    >
      <DialogPortal>
        <DialogOverlay blur={2} zIndex={20} />
        <DialogContent
          zIndex={20}
          radius={4}
          className='setup-account'
          minWidth={500}
          h={600}
          maxHeight='90vh'
          bgColor='rgba(64, 64, 102, 0.80)'
          overflow='auto'
          css={{
            backdropFilter: 'blur(12px)',
          }}
        >
          <DialogBody zIndex={50} px={6} py={6} overflowY='hidden'>
            <HStack
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.10)'
              justify='space-between'
            >
              <Text pt={1} pb={5} px={3} size={6}>
                Club Members
              </Text>
              <IconButton
                onClick={() => navigate(previousLocation)}
                colorTheme='white500'
                size='sm'
                ariaLabel='close'
                variant='outline'
                icon='close'
              />
            </HStack>
            <FlatList
              mt={4}
              h={480}
              overflowY='auto'
              className='thin-scrollbar'
              direction='vertical'
              gap={4}
              w='100%'
              data={membersData.clubMembers.edges}
              renderItem={(item) => (
                <HStack gap={2} items='center'>
                  <Avatar
                    name={item.node.displayName}
                    src={item.node.avatar}
                    size={40}
                  >
                    {/*{Math.random() > 0.5 && (*/}
                    {/*  <AvatarBadge*/}
                    {/*    zIndex={1}*/}
                    {/*    borderColor='#292940'*/}
                    {/*    border={1}*/}
                    {/*    bgColor='#34C05A'*/}
                    {/*    r={0}*/}
                    {/*    b={10}*/}
                    {/*    size='10px'*/}
                    {/*    radius='full'*/}
                    {/*  />*/}
                    {/*)}*/}
                  </Avatar>
                  <TextGroup gap={0}>
                    <TextGroupSubheading weight={500}>
                      {item.node.displayName}
                    </TextGroupSubheading>
                    <TextGroupSubheading
                      color='white700'
                      weight={300}
                      size={1}
                    >
                      @{item.node.username}
                    </TextGroupSubheading>
                  </TextGroup>
                </HStack>
              )}
              keyExtractor={(item) => item.node.id}
            />
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default ClubMembersPage;
