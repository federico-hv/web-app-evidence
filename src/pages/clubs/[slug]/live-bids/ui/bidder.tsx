import {
  Box,
  Center,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import { BidderModel } from '../../../../../features';
import dayjs from 'dayjs';
import { Menu } from '../../../../../shared';

function Bidder({
  confirmWithdraw,
  isActive,
  data,
  position,
}: {
  confirmWithdraw: (bidId: number) => void;
  isActive?: boolean;
  data: BidderModel;
  position?: number;
}) {
  const times = 100000; // This can be a calculation using name and timeAgo?
  const dotsSpacer = '.'.repeat(times);

  return (
    <HStack w='100%' pl='40px' pr='16px' py='8px'>
      <HStack gap={2} flex={4} items={'center'}>
        <Text size={4} weight={400} color='white500'>{`${
          position ? position + '. ' : ''
        }${data.displayName}`}</Text>

        <Text
          size='14px'
          weight={400}
          color='white700'
          css={{ lineHeight: '115%' }}
        >
          {dayjs(data.createdAt).fromNow()}
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
          <Text size={'16px'}>${data.amount.toFixed(2)}</Text>
        </VStack>
        <Box w='32px' />
        {isActive ? (
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
                dangerous
                action={() => {
                  confirmWithdraw(data.bidId as number);
                }}
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
              <Menu.Item>View Profile</Menu.Item>
            </Menu.Content>
          </Menu>
        )}
      </HStack>
    </HStack>
  );
}

export default Bidder;
