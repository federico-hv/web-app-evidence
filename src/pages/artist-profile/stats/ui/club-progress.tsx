import {
  Box,
  Heading,
  HStack,
  Progress,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { IClubAnalyticsResponse } from '../../../../features';
import {
  formatNumberWithCommas,
  makePercentage,
  RadialSurface2,
} from '../../../../shared';

function ClubProgress() {
  const {
    state: {
      clubSummary: { milestones },
    },
  } = useGeneralContext<IClubAnalyticsResponse>();

  const percentage = milestones.numerator / milestones.denominator;

  return (
    <RadialSurface2 shrink={0} w={227} p={4} radius={3}>
      <VStack>
        <HStack gap={3} mb={4}>
          <Heading size={2} weight={400}>
            Your Club Progress
          </Heading>
          {/*<InformationTooltip*/}
          {/*  color='white700'*/}
          {/*  sideOffset={4}*/}
          {/*  size='xs'*/}
          {/*  description=''*/}
          {/*/>*/}
        </HStack>
        <VStack gap={3}>
          <Box>
            <Heading size={6} weight={600}>
              {makePercentage(percentage)}% Complete
            </Heading>
          </Box>
          <Box>
            <Heading size='14px' weight={400}>
              Level 1
            </Heading>
          </Box>
          <VStack gap={1}>
            <Progress
              value={percentage}
              colorTheme='purple500'
              size='xl'
            />
            <Text size={1} color='white700'>
              {formatNumberWithCommas(milestones.numerator)} /{' '}
              {formatNumberWithCommas(milestones.denominator)} members
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </RadialSurface2>
  );
}
export default ClubProgress;
