import { Box, Heading, Icon, List, Text, VStack } from '@holdr-ui/react';

function MembershipCardPerkDetails({ perks }: { perks: string[] }) {
  return (
    <VStack className='membership-card__perk-details' display='none'>
      <Box
        my={4}
        h='1px'
        w='100%'
        css={{ backgroundColor: 'rgba(240,240,255,0.1)' }}
      />
      <Heading
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
MembershipCardPerkDetails.displayName = 'MembershipCardPerkDetails';

export default MembershipCardPerkDetails;
