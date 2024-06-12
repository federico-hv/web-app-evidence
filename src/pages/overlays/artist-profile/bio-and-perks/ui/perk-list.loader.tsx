import { Box, HStack, Skeleton } from '@holdr-ui/react';
import { arrayFrom } from '../../../../../shared';

function PerksListLoader() {
  return (
    <HStack gap={2} wrap='wrap' css={{ opacity: 0.25 }}>
      {arrayFrom(11).map((idx) => (
        <Box radius='full' key={`PLL-${idx}`} overflow='hidden'>
          <Skeleton theme='dark' h='28px' w='110px' />
        </Box>
      ))}
    </HStack>
  );
}
PerksListLoader.displayName = 'PerksListLoader';

export default PerksListLoader;
