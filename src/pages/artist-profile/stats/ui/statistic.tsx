import {
  Heading,
  HStack,
  StringNumeric,
  Text,
  VStack,
} from '@holdr-ui/react';
import { InformationTooltip, RadialSurface2 } from '../../../../shared';
import GainLossIndicator from '../../../../shared/components/gain-loss-indicator';

interface ArtistProfileStatisticProps {
  label: string;
  value: StringNumeric;
  percentage?: number;
  tooltip?: string;
}

function ArtistProfileStatistic({
  label,
  value,
  percentage,
  tooltip,
}: ArtistProfileStatisticProps) {
  return (
    <RadialSurface2 w='100%' h='fit-content' p={4} radius={3}>
      <VStack gap={3}>
        <HStack gap={2}>
          <Heading casing='capitalize' size='14px' weight={400}>
            {label}
          </Heading>
          {tooltip && (
            <InformationTooltip
              color='white700'
              sideOffset={4}
              size='xs'
              description={tooltip}
            />
          )}
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
