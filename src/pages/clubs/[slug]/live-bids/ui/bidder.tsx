import {
  Box,
  Center,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  IAuctionBid,
  useCurrentUser,
  useGetAuctionSuspenseQuery,
  useDeleteBid,
} from '../../../../../features';
import dayjs from 'dayjs';
import { Menu, prefix, useAlertDialog } from '../../../../../shared';
import { useNavigate } from 'react-router-dom';
import { useAuctionAlertContext } from '../../shared/contexts';

function Bidder({
  data,
  position,
  isHighlighted,
}: {
  isHighlighted?: boolean;
  data: IAuctionBid;
  position?: number;
}) {
  const { openWith } = useAlertDialog();

  const { update } = useAuctionAlertContext();

  const dotsSpacer = '.'.repeat(100);

  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const { data: auctionData } = useGetAuctionSuspenseQuery(data.club.id);

  const { deleteBid, loading } = useDeleteBid();

  return (
    <HStack
      w='100%'
      pl='40px'
      pr='16px'
      py='8px'
      bgColor={isHighlighted ? 'rgba(152, 152, 255, 0.2)' : undefined}
      border={isHighlighted ? 2 : undefined}
      borderColor={isHighlighted ? 'rgba(152, 152, 255, 0.5)' : undefined}
    >
      <HStack gap={2} flex={4} items={'center'}>
        <Text size={4} weight={400} color='white500'>{`${
          position ? position + '. ' : ''
        }${data.owner.displayName}`}</Text>

        <Text
          size='14px'
          weight={400}
          color='white700'
          css={{ lineHeight: '115%' }}
        >
          {dayjs(data.bid.createdAt).fromNow()}
        </Text>

        <Center
          flex={1}
          overflowX='hidden'
          w='100px'
          color='white700'
          css={{
            marginRight: '14px',
          }}
        >
          {dotsSpacer}
        </Center>
      </HStack>
      <HStack items='center' pt={'2px'}>
        <VStack>
          <Text size={'16px'}>${data.bid.amount.toFixed(2)}</Text>
        </VStack>
        <Box w='32px' />
        {data.owner.id === currentUser.id ? (
          <Menu minWidth={200}>
            <Menu.Trigger>
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
              <Menu.Item
                dangerous
                disabled={loading}
                action={() =>
                  openWith({
                    title: 'Are you sure you want to withdraw?',
                    description:
                      'Are you sure you want to withdraw your bid from the auction? This action cannot be undone.',
                    actionText: 'Yes, Withdraw Bid',
                    cancelText: 'Do not withdraw',
                    onAction: async () => {
                      await deleteBid(data.bid.id, auctionData.auction.id);

                      update({ status: undefined, eventName: undefined });
                    },
                  })
                }
              >
                Withdraw Bid
              </Menu.Item>
              <Menu.Item>My bidding history</Menu.Item>
            </Menu.Content>
          </Menu>
        ) : (
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
              <Menu.Item
                action={() =>
                  navigate(
                    prefix(
                      data.owner.role === 'artist' ? '/clubs/' : '/',
                      `${data.owner.username}/bio`,
                    ),
                  )
                }
              >
                View Profile
              </Menu.Item>
            </Menu.Content>
          </Menu>
        )}
      </HStack>
    </HStack>
  );
}

export default Bidder;
