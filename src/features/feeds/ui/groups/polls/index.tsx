import { Fragment } from 'react';
import { useFeedContext, useVotePoll } from '../../../shared';
import {
  Box,
  Countdown,
  HStack,
  Icon,
  Image,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
} from '@holdr-ui/react';
import dayjs from 'dayjs';
import { DialogContextProvider, Loader } from '../../../../../shared';
import { PollResponse } from '../index';
import { AnswerPollButton } from '../../buttons';
import pollAlt from '../../../../../assets/images/poll-alt.png';
import { PollsProps } from './types';
import { PollVotesDialog } from '../../dialogs';

function Polls({ id, items, endDate }: PollsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { feedId } = useFeedContext();

  const { votePoll, loading } = useVotePoll();
  // parse poll to check whether there is a vote or not
  const voted = items.reduce((prev, curr) => prev || curr.voted, false);
  // total number of votes
  const total = items.reduce((prev, curr) => prev + curr.count, 0);

  const expired = dayjs(dayjs()).isAfter(endDate);

  return (
    <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
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
              <Fragment key={`poll-${data.id}`}>
                {!voted && !expired ? (
                  <AnswerPollButton
                    onClick={async () =>
                      votePoll(feedId, id, data.id as number)
                    }
                    label={data.text}
                  />
                ) : (
                  <PollResponse total={total} data={data} />
                )}
              </Fragment>
            ))}
          </VStack>

          {(voted || expired) && (
            <HStack
              fontSize={2}
              gap={2}
              items='flex-end'
              w='fit-content'
              css={{ userSelect: 'none' }}
              _hover={{
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={onOpen}
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
          )}

          {!expired && !!endDate && (
            <Fragment>
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
            </Fragment>
          )}
        </VStack>
      </Loader>
      <PollVotesDialog items={items} />
    </DialogContextProvider>
  );
}
Polls.displayName = 'Polls';

export default Polls;
