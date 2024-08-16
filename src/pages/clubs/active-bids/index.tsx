import {
  Box,
  Countdown,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
  Icon,
} from '@holdr-ui/react';
import { Asset } from '../../../shared/constants/assets';
import dayjs from 'dayjs';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GQLClient } from '../../../shared';
import { GET_BIDS, GET_BID_STATUS } from '../../../features';
import {
  Bids,
  BidsData,
  BidsEdge,
  useGetBids,
} from '../shared/hooks/use-get-bids';

interface ActiveBid {
  coverImage: string;
  artistName: string;
  amount: number;
  targetDate: Date;
  status: string;
  css: {
    border: string;
    background: string;
    borderRadius: number;
  };
}

function ActiveBidsClubsPage() {
  const { data } = useGetBids('active');
  const [bids, setBids] = useState<ActiveBid[]>([]);

  useEffect(() => {
    const getBidsData = async (data: BidsData) => {
      const newBidsPromises: Promise<ActiveBid>[] = data.bids.edges.map(
        async (edge: BidsEdge) => {
          const bidId = edge.node.bid.id;
          const status = await fetchBidStatus(bidId);

          const isElibigle = status === 'Eligible';
          let boxStyle;

          if (isElibigle) {
            boxStyle = {
              border: '1px solid rgba(119, 213, 144, 0.15)',
              background: 'rgba(162, 226, 179, 0.2)',
            };
          } else {
            boxStyle = {
              border: '1px solid rgba(255, 212, 126, 0.15)',
              background: 'rgba(255, 226, 166, 0.2)',
            };
          }

          return {
            coverImage: edge.node.club.coverImage,
            artistName: edge.node.artist.displayName,
            amount: edge.node.bid.amount,
            targetDate: edge.node.auction.endsAt as unknown as Date,
            status,
            css: {
              borderRadius: 8,
              ...boxStyle,
            },
          };
        },
      );

      const newBids = await Promise.all(newBidsPromises);

      setBids(newBids);
    };

    if (data && data.bids) {
      getBidsData(data);
    }
  }, [data]);

  async function fetchBidStatus(bidId: number) {
    try {
      const { data } = await GQLClient.query({
        query: GET_BID_STATUS,
        variables: { bidId },
      });

      return data.bidStatus;
    } catch (error) {
      console.error('Error fetching club perks:', error);
      throw error;
    }
  }

  if (bids.length == 0) {
    return <VStack h={'100vh'}></VStack>;
  }

  return (
    <VStack
      bg={'rgba(48, 48, 75, 0.60)'}
      p={'16px'}
      gap={5}
      w='100'
      justify='center'
      radius={12}
    >
      <HStack>
        <Box flex={2}>
          <Text size='16px' weight={500}>
            Artist
          </Text>
        </Box>
        <Box flex={1}>
          <Text size='16px' weight={500}>
            Bid
          </Text>
        </Box>
        <Box flex={1}>
          <Text size='16px' weight={500}>
            Timer
          </Text>
        </Box>
        <Box flex={1}>
          <Text size='16px' weight={500}>
            Status
          </Text>
        </Box>
      </HStack>
      <Box h={'1px'} w='100%' bgColor='purpleTint300' />
      {bids.map((bid) => (
        <VStack>
          <HStack p={'8px'} css={bid.css} items='center'>
            <VStack flex={2}>
              <HStack gap={3} items='center'>
                <Image
                  w='100%'
                  css={{ width: '50px', height: '50px' }}
                  src={bid.coverImage}
                  srcSet={bid.coverImage}
                  fallbackSrc={Asset.Image.SpotifyLogo}
                  alt={`${bid.artistName}'s club cover image.`}
                />
                <Text>{bid.artistName}</Text>
                <Icon size='xl' color='white500' name='verified-outline' />
              </HStack>
            </VStack>
            <VStack flex={1}>
              <Text>${bid.amount.toFixed(2)}</Text>
            </VStack>
            <VStack flex={1}>
              <Countdown color='white500' targetDate={bid.targetDate} />
            </VStack>
            <VStack flex={1}>
              <Text>{bid.status}</Text>
            </VStack>
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
}
ActiveBidsClubsPage.displayName = 'ActiveBidsClubsPage';

export default ActiveBidsClubsPage;
