import {
  Box,
  Circle,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { MembershipPerkDetailsProps } from './types';
import { FlatList } from '../../../../../tmp/flat-list';

function MembershipPerkDetails({ perks }: MembershipPerkDetailsProps) {
  return (
    <VStack className='membership-card__perk-details' display='flex'>
      <Box
        mt={3}
        mb={4}
        h='1px'
        w='100%'
        css={{ backgroundColor: 'rgba(240,240,255,0.1)' }}
      />
      <Heading
        noOfLines={1}
        size={3}
        weight={500}
        as='h3'
        casing='capitalize'
        css={{ mb: '$2' }}
      >
        Membership perks
      </Heading>
      <FlatList
        direction='vertical'
        data={perks}
        renderItem={(perk) => (
          <HStack fontSize={1} gap={2} items='center'>
            <Circle bgColor='white500' size='5px' />
            <Text noOfLines={2}>{perk}</Text>
          </HStack>
        )}
        keyExtractor={(perk) => perk}
      />
    </VStack>
  );
}
MembershipPerkDetails.displayName = 'MembershipPerkDetails';

export default MembershipPerkDetails;
