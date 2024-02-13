import { Box, Circle, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import { PollResponseProps } from './types';

function PollResponse({ data, total }: PollResponseProps) {
  const percentage = !total ? 0 : (data.count / total) * 100;

  return (
    <HStack
      items='center'
      gap={3}
      p={3}
      radius={4}
      position='relative'
      overflow='hidden'
      css={{ userSelect: 'none' }}
    >
      {data.voted ? (
        <Circle zIndex={10} size={20} bgColor='purple500'>
          <Icon size='sm' color='white50' name='check' />
        </Circle>
      ) : (
        <Circle zIndex={10} border={1} borderColor='white500' size={20} />
      )}
      <Box
        position='absolute'
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={parseInt(percentage.toFixed(0))}
        t={0}
        l={0}
        h='100%'
        w={`${percentage.toFixed(0)}%`}
        css={{ backgroundColor: '#ECECFF' }}
      />
      <VStack w='100%' gap={2} zIndex={10}>
        <HStack justify='space-between'>
          <Text
            size={{ '@bp1': 2, '@bp3': 3 }}
            color={data.voted ? 'purple500' : 'white500'}
            weight={data.voted ? 500 : 400}
          >
            {data.text}
          </Text>
          <Text
            size={{ '@bp1': 2, '@bp3': 3 }}
            weight={500}
            color={data.voted ? 'base800' : 'base100'}
          >
            {percentage.toFixed(0)}%
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
PollResponse.displayName = 'PollResponse';

export default PollResponse;
