import {
  HStack,
  Heading,
  VStack,
  Text,
  Card,
  IconButton,
  Button,
  Stack,
  Icon,
  UnorderedList,
  List,
  Input,
  Countdown,
  Box,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  hexToRGB,
  useGeneralContext,
} from '@holdr-ui/react';

import { FlatList } from '../../../tmp/flat-list';
import {
  useCurrentUser,
  IPerk,
  useClubContext,
  useGetClub,
  useGetClubPerks,
  IClub,
} from '../../../features';
import { Asset, Head, Loader, Menu } from '../../../shared';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

interface LiveBidCandidateModel {
  name: string;
  timeAgo: string;
  price: string;
}

const eligibleMembers: LiveBidCandidateModel[] = [
  {
    name: 'Zaire Dorwart',
    timeAgo: '2 hours ago',
    price: '$801.00',
  },
  {
    name: 'Roger Lubin',
    timeAgo: '20 minutes ago',
    price: '$799.00',
  },
  {
    name: 'Ahmad Stanton',
    timeAgo: '3 hours ago',
    price: '$795.00',
  },
  {
    name: 'Ann Bergson',
    timeAgo: '43 minutes ago',
    price: '$779.00',
  },
  {
    name: 'Hanna Press',
    timeAgo: '2 hours ago',
    price: '$745.00',
  },
];

const outOfContention = [
  {
    name: 'Eleanor Summers',
    timeAgo: '1 day ago',
    price: '$700.00',
  },
  {
    name: 'Michael Green',
    timeAgo: '2 days ago',
    price: '$680.00',
  },
  {
    name: 'Laura McCarthy',
    timeAgo: '5 hours ago',
    price: '$720.00',
  },
  {
    name: 'David Finch',
    timeAgo: '3 hours ago',
    price: '$750.00',
  },
  {
    name: 'Olivia Walters',
    timeAgo: '4 days ago',
    price: '$690.00',
  },
  {
    name: 'John Smith',
    timeAgo: '6 hours ago',
    price: '$710.00',
  },
  {
    name: 'Emma Johnson',
    timeAgo: '1 hour ago',
    price: '$730.00',
  },
  {
    name: 'Daniel Brown',
    timeAgo: '2 days ago',
    price: '$740.00',
  },
  {
    name: 'Sophia Lee',
    timeAgo: '3 days ago',
    price: '$725.00',
  },
  {
    name: 'James Wilson',
    timeAgo: '4 hours ago',
    price: '$760.00',
  },
  {
    name: 'Mia Thomas',
    timeAgo: '5 hours ago',
    price: '$785.00',
  },
  {
    name: 'Alexander Lee',
    timeAgo: '6 days ago',
    price: '$690.00',
  },
  {
    name: 'Charlotte White',
    timeAgo: '1 day ago',
    price: '$710.00',
  },
  {
    name: 'Benjamin Lee',
    timeAgo: '7 hours ago',
    price: '$740.00',
  },
  {
    name: 'Amelia Clark',
    timeAgo: '2 hours ago',
    price: '$730.00',
  },
  {
    name: 'Ethan Robinson',
    timeAgo: '5 days ago',
    price: '$700.00',
  },
  {
    name: 'Ava Lewis',
    timeAgo: '3 days ago',
    price: '$720.00',
  },
  {
    name: 'Noah Young',
    timeAgo: '8 hours ago',
    price: '$750.00',
  },
  {
    name: 'Isabella King',
    timeAgo: '6 hours ago',
    price: '$760.00',
  },
  {
    name: 'Lucas Wright',
    timeAgo: '4 days ago',
    price: '$790.00',
  },
];

function EligibleMember({
  index,
  name,
  timeAgo,
  price,
}: LiveBidCandidateModel & { index: number }) {
  const times = 98; // This can be a calculation using name and timeAgo?
  const dotsSpacer = '.'.repeat(times);

  return (
    <HStack w={'100%'} maxHeight={'40px'} pl={'40px'} pr={'16px'} py='8px'>
      <HStack gap={2} flex={4} items={'center'}>
        <VStack>
          <Text size={'18px'} weight={400} color='white500'>{`${
            index + 1
          }. ${name}`}</Text>
        </VStack>

        <VStack>
          <Text size='14px' weight={400} color='white700'>
            {timeAgo}
          </Text>
        </VStack>

        <Text size={'18px'} weight={400} color='white700'>
          {dotsSpacer}
        </Text>
      </HStack>
      <HStack w={'120px'} items={'center'} pt={'2px'}>
        <VStack w='64px'>
          <Text size={'16px'}>{price}</Text>
        </VStack>
        <Box w='32px' />
        <VStack w={'24px'} items={'flex-end'}>
          <Menu minWidth={200}>
            <Menu.Trigger>
              {/* <IconButton variant="ghost" icon="more-fill" ariaLabel='menu button' /> */}
              <IconButton
                variant='ghost'
                icon='more-fill'
                ariaLabel=''
                size={'base'}
                css={{
                  color: '$purple300',
                }}
              />
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item dangerous>Withdraw Bid</Menu.Item>
              <Menu.Item>My bidding history</Menu.Item>
            </Menu.Content>
          </Menu>
        </VStack>
      </HStack>
    </HStack>
  );
}

enum CandidateType {
  eligible = 'eligible',
  out = 'out',
}

// Used to list both Eligible Members and Out of Contention Members

function LiveAuctionCandidates({
  type,
  candidates,
}: {
  type: CandidateType;
  candidates: LiveBidCandidateModel[];
}) {
  return (
    <VStack radius={4} bgColor='#30304B'>
      <Card
        w='100%'
        boxShadow='base'
        divider={
          <Box
            w={'100%'}
            h={'1px'}
            bgColor='purple300'
            css={{ opacity: '10%' }}
          />
        }
      >
        <Card.Header
          p={4}
          direction='horizontal'
          items='center'
          justify='space-between'
        >
          <HStack w='100%'>
            <VStack flex={3} justify={'center'}>
              <Heading
                weight={400}
                size={'20px'}
                color='white500'
                css={{ lineHeight: '115%' }}
              >
                {type == CandidateType.eligible && 'Eligible'}
                {type == CandidateType.out && 'Out of Contention'}
              </Heading>
            </VStack>
            {type == CandidateType.eligible && (
              <VStack flex={1} justify={'center'} items={'flex-end'}>
                <Heading weight={500} size={'16px'}>
                  7 Memberships available
                </Heading>
              </VStack>
            )}
          </HStack>
        </Card.Header>
        <Card.Body
          w='full'
          bgColor='#30304B'
          py={'16px'}
          css={{
            blur: '12px',
            borderBottomRadius: '$4',
          }}
        >
          <FlatList<LiveBidCandidateModel>
            data={candidates}
            keyExtractor={(member) => member.name}
            renderItem={(member, index) => (
              <EligibleMember index={index} {...member} />
            )}
            direction={'vertical'}
          />
        </Card.Body>
      </Card>
    </VStack>
  );
}

function MembershipPerks({ clubId }: { clubId: string }) {
  const { loading, data, error } = useGetClubPerks(clubId);

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <VStack radius={2} p={4} bgColor='#30304B' maxHeight={'235px'}>
          <HStack flex={1}>
            <Stack flex={10}>
              <Heading size={'18px'} weight={500} color='white500'>
                Membership Perks
              </Heading>
            </Stack>
            <Stack w={'24px'} h='24px' justify={'center'}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icon
                      size='xl'
                      name='information-outline'
                      color='white700'
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    bgColor='#202032'
                    border={1}
                    radius={1}
                    fontSize={2}
                    borderColor={hexToRGB('#9898FF', 0.25)}
                    color='white500'
                    side='top'
                  >
                    Perks are subject to change.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Stack>
          </HStack>
          <VStack flex={2} pt={4}>
            <UnorderedList>
              {data.clubPerks.map((perk: IPerk) => (
                <List.Item key={perk.id}>
                  <Text size={'16px'} weight={400} color={'white600'}>
                    {perk.label}
                  </Text>
                </List.Item>
              ))}
            </UnorderedList>
          </VStack>
        </VStack>
      )}
    </Loader>
  );
}

function ArtistLiveBids() {
  const { state: club } = useGeneralContext<IClub>();

  function addDays(_date: Date, days: number) {
    let date = new Date(_date);
    date.setDate(date.getDate() + days);
    return date;
  }

  const targetDate = addDays(new Date(), 3);

  return (
    <Fragment>
      <Head
        prefix={`${club.artist.name}'s Club -`}
        title='Live Bids'
        description='A catalog of memberships that are being offered by artists.'
      />
      <VStack gap={4}>
        <HStack gap={4}>
          <VStack>
            <Card
              boxShadow='base'
              h='484px'
              w='396px'
              bgImageUrl={Asset.Image.LightPlaceholder}
            >
              <Card.Header
                p={4}
                direction='horizontal'
                items='center'
                justify='space-between'
              >
                <HStack w='100%' justify={'flex-end'}>
                  <IconButton
                    size={'xl'}
                    colorTheme='base600'
                    icon='eye-show'
                    ariaLabel=''
                  />
                </HStack>
              </Card.Header>
              <Card.Body
                position='absolute'
                b={0}
                l={0}
                w='full'
                bgColor='#30304B'
                p={4}
                gap={4}
                css={{
                  blur: '12px',
                  borderBottomRadius: '$4',
                }}
              >
                <VStack>
                  <HStack h='18px'>
                    <Heading size={'16px'} weight={300} color='white600'>
                      Entry Price
                    </Heading>
                  </HStack>
                  <Box h='8px' />
                  <HStack h='23px'>
                    <Heading size={'20px'} weight={400} color='white500'>
                      $732.00 USD
                    </Heading>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card>
          </VStack>
          <VStack maxHeight='484px' w='468px' radius={4}>
            <MembershipPerks clubId={club.id} />
            <VStack gap={2} flex={1} justify={'flex-end'}>
              <HStack gap={2} h={'24px'} items={'center'}>
                <Icon name='time-outline' />
                <Countdown
                  size='base'
                  color='white500'
                  targetDate={targetDate}
                />
              </HStack>
              <Input
                type='string'
                placeholder='Enter Amount'
                color='white500'
                css={{
                  backgroundColor: '$purple1000',
                  height: '48px',
                }}
              />
              <Button
                radius={2}
                colorTheme='purple500'
                fullWidth
                style={{
                  height: '48px',
                }}
              >
                Place Bid
              </Button>
            </VStack>
          </VStack>
        </HStack>
        <LiveAuctionCandidates
          type={CandidateType.eligible}
          candidates={eligibleMembers}
        />
        <LiveAuctionCandidates
          type={CandidateType.out}
          candidates={outOfContention}
        />
      </VStack>
    </Fragment>
  );
}

ArtistLiveBids.displayName = 'ArtistLiveBids';
export default ArtistLiveBids;
