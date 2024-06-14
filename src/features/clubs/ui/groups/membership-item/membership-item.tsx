import {
  Avatar,
  HStack,
  VStack,
  Text,
  Icon,
  theme,
} from '@holdr-ui/react';
import { MembershipItemProps } from './membership-item.types';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../../shared';

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
          <TextGroupHeading
            size={2}
            css={{ lineHeight: 1.45 }}
            aria-label='membership-item name'
          >
            {data.name}
          </TextGroupHeading>
          <TextGroupSubheading
            size={1}
            weight={300}
            color='white700'
            css={{ lineHeight: 1 }}
            aria-label='membership-item number'
          >
            {`Membership #${data.number}`}
          </TextGroupSubheading>
        </TextGroup>
        <HStack gap={1} items='center'>
          {data.percentage !== 0 && (
            <Icon
              name={
                data.percentage > 0
                  ? 'arrow-up-outline'
                  : 'arrow-down-outline'
              }
              color={data.percentage > 0 ? 'success500' : 'danger400'}
              aria-label={`${
                data.percentage ? 'increase' : 'decrease'
              } in value`}
            />
          )}
          <Text
            weight={500}
            size={2}
            color={data.percentage ? 'success500' : 'danger400'}
            aria-label='membership-item price change'
          >
            {`$${data.price.toFixed(2)} USD`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default MembershipItem;
