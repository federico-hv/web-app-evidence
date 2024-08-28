import { Box, Circle, HStack, Text, VStack } from '@holdr-ui/react';
import { PollResponseProps } from './types';
import { useCurrentUser } from '../../../../auth';
import { useFeedContext } from '../../../shared';
import { Fragment } from 'react';

function PollResponse({ data, total }: PollResponseProps) {
  const currentUser = useCurrentUser();

  const { owner } = useFeedContext();

  const percentage = !total ? 0 : (data.count / total) * 100;

  return (
    <HStack
      items='center'
      gap={3}
      p={2}
      radius={2}
      position='relative'
      overflow='hidden'
      css={{ userSelect: 'none' }}
    >
      {currentUser.id !== owner.id && (
        <Fragment>
          {data.voted ? (
            <Circle
              zIndex={10}
              size={20}
              border={2}
              borderColor='purple100'
            >
              <Circle size='8px' bgColor='purple100' />
            </Circle>
          ) : (
            <Circle
              zIndex={10}
              size={20}
              border={2}
              borderColor='purple100'
            />
          )}
        </Fragment>
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
        css={{ backgroundColor: 'rgba(152, 152, 255, 0.15)' }}
      />
      <VStack w='100%' gap={2} zIndex={10}>
        <HStack justify='space-between'>
          <Text
            size={{ '@bp1': 2, '@bp3': 3 }}
            color={data.voted ? 'purple200' : 'white500'}
            weight={data.voted ? 500 : 400}
          >
            {data.text}
          </Text>
          <Text
            size={{ '@bp1': 2, '@bp3': 3 }}
            weight={500}
            color={data.voted ? 'white700' : 'white700'}
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
