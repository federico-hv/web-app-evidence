import { Fragment } from 'react';
import { useFeedContext, useVotePoll } from '../../../shared';
import { VStack, useDisclosure } from '@holdr-ui/react';
import dayjs from 'dayjs';
import {
  CustomSkeleton,
  DialogContextProvider,
  Loader,
} from '../../../../../shared';
import { PollResponse } from '../index';
import { AnswerPollButton } from '../../buttons';
import { PollsProps } from './types';
import { PollVotesDialog } from '../../dialogs';
import { FlatList } from '../../../../../tmp/flat-list';
import { useCurrentUser } from '../../../../auth';

function Polls({ id, items, endDate }: PollsProps) {
  const currentUser = useCurrentUser();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { feedId, owner } = useFeedContext();

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
          <FlatList
            w='100%'
            direction='vertical'
            gap={3}
            mt={4}
            pl='6px'
            data={items}
            renderItem={(item) => (
              <CustomSkeleton radius={1} h={6} w='100%' />
            )}
            keyExtractor={(item) => item.id}
          />
        }
      >
        <VStack position='relative' zIndex={5} gap={5}>
          <VStack gap={3} mt={5} pl='6px'>
            {items.map((data) => (
              <Fragment key={`poll-${data.id}`}>
                {!voted && !expired && owner.id !== currentUser.id ? (
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
        </VStack>
      </Loader>
      <PollVotesDialog items={items} />
    </DialogContextProvider>
  );
}
Polls.displayName = 'Polls';

export default Polls;
