import { Avatar, HStack, VStack, Text, theme } from '@holdr-ui/react';
import { IMembership } from '../../../../memberships';

function MembershipItem({ data }: { data: IMembership }) {
  const percentage = Math.random();
  const value = 1000;
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
      <Avatar size={60} src={data.club.coverImage} variant='squircle' />
      <VStack gap={2}>
        <Text noOfLines={1} size={3} weight={500}>
          {data.club.name}
        </Text>
        {/*<HStack gap={1} items='center'>*/}
        {/*  <GainLossIndicator isGain={percentage > 0.5} />*/}
        {/*  <Text*/}
        {/*    weight={500}*/}
        {/*    size={2}*/}
        {/*    color={percentage > 0.5 ? 'success500' : 'danger400'}*/}
        {/*    aria-label='membership-item price change'*/}
        {/*  >*/}
        {/*    {`$${value.toFixed(2)} USD`}*/}
        {/*  </Text>*/}
        {/*</HStack>*/}
      </VStack>
    </HStack>
  );
}

export default MembershipItem;
