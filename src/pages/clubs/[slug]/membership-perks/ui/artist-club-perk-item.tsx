import { IPerk } from '../../../../../features';
import { Box, HStack, Text, VStack } from '@holdr-ui/react';

function ArtistClubPerkItem({
  data,
}: {
  data: IPerk & { additionalInfo?: string };
}) {
  return (
    <VStack>
      <HStack gap={2} h='21px' items={'center'}>
        <Text size={4} weight={500} color='white500'>
          {data.label}
        </Text>
        <Text size={2} color='white700'>
          {data.additionalInfo}
        </Text>
      </HStack>
      <Box h='12px' />
      <VStack h='32px'>
        <Text
          size={'14px'}
          weight={400}
          color='white700'
          css={{ lineHeight: '115%' }}
        >
          {data.description}
        </Text>
      </VStack>
    </VStack>
  );
}
ArtistClubPerkItem.displayName = 'ArtistClubPerkItem';

export default ArtistClubPerkItem;
