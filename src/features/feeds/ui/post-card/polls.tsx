import { IPoll, useFeedContext, useVotePoll } from '../../shared';
import {
  Box,
  Center,
  Circle,
  Countdown,
  HStack,
  Icon,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@holdr-ui/react';
import { theme } from '../../../../configs';
import dayjs from 'dayjs';
import {
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../../../shared';
import pollAlt from '../../../../assets/images/poll-alt.png';

function PollResponse({ data, total }: { data: IPoll; total: number }) {
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
        <Circle zIndex={10} size={20} bgColor='secondary400'>
          <Icon size='sm' color='primary400' name='check' />
        </Circle>
      ) : (
        <Circle
          zIndex={10}
          border={1}
          borderColor='secondary400'
          size={20}
        />
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
            color='secondary400'
            weight={data.voted ? 500 : 400}
          >
            {data.text}
          </Text>
          <Text
            size={{ '@bp1': 2, '@bp3': 3 }}
            weight={500}
            color='base400'
          >
            {percentage.toFixed(0)}%
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

function PollAnswer({
  data,
  action,
}: {
  data: IPoll;
  action: VoidFunction;
}) {
  return (
    <Center
      onClick={action}
      cursor='pointer'
      role='button'
      p={3}
      border={1}
      radius='full'
      borderColor='base200'
      position='relative'
      overflow='hidden'
      _hover={{
        backgroundColor: '$base100',
      }}
      css={{
        userSelect: 'none',
        '&:active': {
          scale: 0.95,
          transition: `all ${theme.transitions['duration-normal']} linear`,
        },
      }}
    >
      {/** 👇🏾 Label */}
      <Text
        size={{ '@bp1': 2, '@bp3': 3 }}
        weight={500}
        noOfLines={1}
        css={{ zIndex: 10 }}
      >
        {data.text}
      </Text>
    </Center>
  );
}

/*

 */
function Polls({
  id,
  items,
  endDate,
}: {
  items: IPoll[];
  id: number;
  endDate?: Date | null;
}) {
  const { feedId } = useFeedContext();

  const { votePoll, loading } = useVotePoll();
  // parse poll to check whether there is a vote or not
  const voted = items.reduce((prev, curr) => prev || curr.voted, false);
  // total number of votes
  const total = items.reduce((prev, curr) => prev + curr.count, 0);

  const expired = dayjs(dayjs()).isAfter(endDate);

  return (
    <Loader
      loading={loading}
      h='fit-content'
      as={
        <VStack w='100%' gap={3} mt={4}>
          {items.map(({ id }) => (
            <Box
              key={`loader-${id}`}
              w='100%'
              radius='full'
              overflow='hidden'
            >
              <Skeleton h='29px' />
            </Box>
          ))}
        </VStack>
      }
    >
      <VStack position='relative' zIndex={5} gap={5}>
        <VStack gap={3} mt={5}>
          {items.map((data) => (
            <SwitchConditional key={`poll-${data.id}`}>
              <SwitchConditionalCase on={!voted && !expired}>
                <PollAnswer
                  action={async () =>
                    votePoll(feedId, id, data.id as number)
                  }
                  data={data}
                />
              </SwitchConditionalCase>
              <SwitchConditionalCase on={voted || expired}>
                <PollResponse total={total} data={data} />
              </SwitchConditionalCase>
            </SwitchConditional>
          ))}
        </VStack>
        {voted || expired ? (
          <HStack
            fontSize={2}
            gap={2}
            items='flex-end'
            css={{ userSelect: 'none' }}
          >
            <Image
              size={{ '@bp1': 13, '@bp3': 16 }}
              alt=''
              src={pollAlt}
            />
            <Text size={{ '@bp1': 1, '@bp3': 2 }} color='base400'>
              {total} {total > 1 ? 'votes' : 'vote'}
            </Text>
          </HStack>
        ) : (
          <SwitchConditional>
            <SwitchConditionalCase on={!!endDate}>
              <HStack fontSize={2} gap={2} items='center'>
                <Icon name='time-outline' size='base' />
                <Text size={2} color='base400'>
                  Ends in
                </Text>
                <Countdown
                  size='sm'
                  targetDate={dayjs(endDate, 'x').toDate()}
                />
              </HStack>
            </SwitchConditionalCase>
          </SwitchConditional>
        )}
      </VStack>
    </Loader>
  );
}
Polls.displayName = 'Polls';

export default Polls;
