import { Box, Heading, Icon, List, Text, VStack } from '@holdr-ui/react';
import { MembershipPerkDetailsProps } from './types';

function MembershipPerkDetails({ perks }: MembershipPerkDetailsProps) {
  return (
    <VStack className='membership-card__perk-details' display='flex'>
      <Box
        my={4}
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
        css={{ pb: '$4' }}
      >
        Membership perks
      </Heading>
      <List>
        {perks.map((perk) => (
          <List.Item
            key={perk}
            icon={<Icon size='xs' name='middle-dot-fill' />}
          >
            <Text size={2} noOfLines={2}>
              {perk}
            </Text>
          </List.Item>
        ))}
      </List>
    </VStack>
  );
}
MembershipPerkDetails.displayName = 'MembershipPerkDetails';

export default MembershipPerkDetails;
