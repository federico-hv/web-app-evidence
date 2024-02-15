import {
  Avatar,
  HStack,
  VStack,
  Text,
  Icon,
  theme,
} from '@holdr-ui/react';
import { TextGroup, TextGroupHeading, TextGroupSubheading } from 'shared';
import { MembershipItemProps } from './membership-item.types';

function MembershipItem({ data }: MembershipItemProps) {
  return (
    <HStack
      gap={4}
      items='center'
      py={2}
      px={3}
      radius={3}
      _hover={{ background: '#9898FF26', cursor: 'pointer' }}
      css={{
        transition: theme.transitions['duration-normal'],
      }}
    >
      <Avatar size='xl' src={data.artist.avatar} variant='squircle' />
      <VStack gap={2}>
        <TextGroup gap={0}>
          <TextGroupHeading size={2} css={{ lineHeight: 1.45 }}>
            {data.name}
          </TextGroupHeading>
          <TextGroupSubheading
            size={1}
            weight={300}
            color='white700'
            css={{ lineHeight: 1 }}
          >
            {`Membership #${data.membershipNum}`}
          </TextGroupSubheading>
        </TextGroup>
        <HStack gap={1} items='center'>
          <Icon
            name={
              data.priceHasRisen
                ? 'arrow-up-outline'
                : 'arrow-down-outline'
            }
            color={data.priceHasRisen ? 'success500' : 'danger400'}
          />
          <Text
            weight={500}
            size={2}
            color={data.priceHasRisen ? 'success500' : 'danger400'}
          >
            {`$${data.priceChange.toFixed(2)} USD`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default MembershipItem;
