import { RadialSurface, StringNumeric } from '../../../shared';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  Tooltip,
  VStack,
} from '@holdr-ui/react';

function AnalyticsStatistic({
  label,
  value,
  percent,
  description,
}: {
  label: string;
  value: StringNumeric;
  percent?: number;
  description?: string;
}) {
  return (
    <VStack py={3} gap={3} mt={1} css={{ userSelect: 'none' }}>
      <HStack items='center' gap={2}>
        <Box>
          <Text casing='capitalize' color='base300' size='14px'>
            {label}
          </Text>
        </Box>
        {description && (
          <Box mt='1px'>
            <Tooltip color='white50' label={description}>
              <Box fontSize='12px'>
                <Icon color='base400' name='information-outline' />
              </Box>
            </Tooltip>
          </Box>
        )}
      </HStack>
      <HStack items='flex-end' justify='space-between'>
        <Box fontSize='32px'>{value}</Box>
        {percent !== undefined && (
          <HStack>
            {/* arrow coming soon...*/}
            <Box>{percent}%</Box>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
}

function AnalyticsSummary() {
  return (
    <RadialSurface radius={4} h={618} w='100%' css={{ flexShrink: 0 }}>
      <VStack as='nav' p={4}>
        <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
          Analytics
        </Heading>
        <Box
          mt={{ '@bp1': '8px', '@bp3': '8px' }}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={3}>
          <AnalyticsStatistic
            label='club views'
            description='A description'
            value={0}
            percent={0}
          />
          <AnalyticsStatistic
            label='total resales'
            description='A description'
            value={0}
            percent={0}
          />
          <AnalyticsStatistic
            label='conversion rate'
            description='A description'
            value='0%'
            percent={0}
          />
          <AnalyticsStatistic
            label='social interactions'
            description='A description'
            value='0%'
            percent={0}
          />
          <AnalyticsStatistic
            label='total membership sales'
            description='A description'
            value={0}
            percent={0}
          />
          <AnalyticsStatistic
            label='peak engagement time'
            description='A description'
            value='-'
          />
          <AnalyticsStatistic
            label='geographic location'
            description='A description'
            value='-'
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
