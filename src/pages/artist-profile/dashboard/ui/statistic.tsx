import {
  Heading,
  HStack,
  StringNumeric,
  Text,
  VStack,
} from '@holdr-ui/react';
import { RadialSurface2 } from '../../../../shared';
import GainLossIndicator from '../../../../shared/components/gain-loss-indicator';

interface ArtistProfileStatisticProps {
  label: string;
  value: StringNumeric;
  percentage?: number;
}

function ArtistProfileStatistic({
  label,
  value,
  percentage,
}: ArtistProfileStatisticProps) {
  return (
    <RadialSurface2 w='100%' h='fit-content' p={4} radius={3}>
      <VStack gap={3}>
        <HStack>
          <Heading
            casing='capitalize'
            size='14px'
            // py='6px'
            weight={400}
            css={{
              lineHeight: '115%',
            }}
          >
            {label}
          </Heading>
        </HStack>
        <HStack justify='space-between' items='flex-start' fontSize='18px'>
          <Text>{value}</Text>
          {percentage !== undefined && (
            <HStack gap={2} items='center'>
              {percentage !== 0 && (
                <GainLossIndicator isGain={percentage > 0} />
              )}
              <Text size={2}>{Math.abs(percentage).toFixed(1)}%</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </RadialSurface2>
  );
}
ArtistProfileStatistic.displayName = 'ArtistProfileStatistic';

export default ArtistProfileStatistic;
