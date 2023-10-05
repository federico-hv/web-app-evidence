import {
  Box,
  Center,
  HStack,
  Icon,
  Switch,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { useEffect, useState } from 'react';

import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useRecordState,
} from '../../../../../shared';
import dayjs from 'dayjs';
import { PollAnswerInput, SelectTime } from '../../inputs';
import { AddPollProps, ITime } from './types';

function AddPoll({ update, remove, reset }: AddPollProps) {
  const MaximumOptions = 4;
  const [responses, set] = useState(['', '']);
  const { switchState: withEndDate, turnOn, turnOff } = useSwitch(true);
  const [startFrom, updateStartFrom] = useRecordState<ITime>({
    days: -1,
    hours: -1,
    minutes: -1,
  });
  const [time, updateTime] = useRecordState<ITime>({
    days: 1,
    hours: 0,
    minutes: 0,
  });

  const addPoll = () => set((prev) => [...prev, '']);

  const updatePoll = (text: string, idx: number) =>
    set((prev) => {
      // endDate

      // replace elem at idx
      const newResponses = [
        ...prev.slice(0, idx),
        text,
        ...prev.slice(idx + 1),
      ];

      // update state
      update({
        responses: newResponses,
      });
      // return new responses
      return newResponses;
    });

  const updateEndDate = (current: ITime) =>
    update({
      endDate: withEndDate
        ? dayjs()
            .add(current.days, 'd')
            .add(current.hours, 'h')
            .add(current.minutes, 'm')
            .toDate()
        : undefined,
    });

  useEffect(() => {
    update({ responses });
  }, []);

  return (
    <VStack
      position='relative'
      border={1}
      borderColor='base200'
      h='auto'
      w='100%'
      radius={4}
      overflow='hidden'
      css={{ flexShrink: 0 }}
    >
      <VStack>
        <VStack h='full' w='full' gap={3} radius={2} p={3}>
          {responses.map((current, idx) => (
            <PollAnswerInput
              key={`choice-${idx + 1}`}
              title={`Choice ${idx + 1}`}
              value={responses[idx]}
              update={(value) => updatePoll(value, idx)}
            />
          ))}
          {responses.length < MaximumOptions && (
            <HStack
              py={{ '@bp1': 3, '@bp3': 4 }}
              gap={3}
              as='button'
              role='button'
              items='center'
              justify='center'
              bgColor='base100'
              radius={2}
              _hover={{ backgroundColor: '$base200' }}
              onClick={() => {
                // increaseHeight(62.5);
                addPoll();
              }}
            >
              <Icon
                color='base600'
                name='add'
                size={{ '@bp1': 'sm', '@bp3': 'lg' }}
              />
              <Text
                size={{ '@bp1': 2, '@bp3': 3 }}
                weight={500}
                color='base600'
              >
                Add Choice
              </Text>
            </HStack>
          )}
        </VStack>
      </VStack>
      <VStack
        p={3}
        borderTop={1}
        gap={3}
        borderColor='base200'
        divider={<Box borderBottom={1} borderColor='base100' />}
      >
        <HStack as='label' gap={4} items='flex-start'>
          <TextGroup>
            <TextGroupHeading
              casing='capitalize'
              size={{ '@bp1': 2, '@bp3': 3 }}
              as='h3'
            >
              Open Poll
            </TextGroupHeading>
            <TextGroupSubheading
              size={{ '@bp1': 1, '@bp3': 2 }}
              color='base400'
            >
              While enabled, users will be able to to vote on the poll
              forever.
            </TextGroupSubheading>
          </TextGroup>
          <Switch
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            value={`${withEndDate}`}
            onChange={(e) =>
              e.target.value === 'true' ? turnOff() : turnOn()
            }
          />
        </HStack>
        {withEndDate && (
          <HStack gap={4}>
            <SelectTime
              startFrom={startFrom.days}
              name='days'
              value={time.days}
              numberOfOptions={8}
              onChange={(e) => {
                // updateStartFrom({ hours: 0 });
                if (parseInt(e.target.value) === 0) {
                  // -> if hours 0, and minutes 0; set hours to 1
                  if (time.hours === 0 && time.minutes === 0) {
                    updateTime({ hours: 1 });
                  }
                }
                updateTime(
                  { days: parseInt(e.target.value) },
                  updateEndDate,
                );
              }}
            />

            <SelectTime
              startFrom={startFrom.hours}
              name='hours'
              value={time.hours}
              numberOfOptions={24}
              onChange={(e) => {
                updateStartFrom({ minutes: 0 });
                if (parseInt(e.target.value) === 0) {
                  // -> if minutes 0 and days 0; set minutes to 15
                  if (time.minutes === 0 && time.days === 0) {
                    updateTime({ minutes: 15 });
                    updateStartFrom({ minutes: 15 });
                  }
                  // -> if hours > 0 or days > 0; skip
                }

                updateTime(
                  { hours: parseInt(e.target.value) },
                  updateEndDate,
                );
              }}
            />

            <SelectTime
              startFrom={startFrom.minutes}
              name='minutes'
              value={time.minutes}
              numberOfOptions={60}
              onChange={(e) => {
                updateTime(
                  { minutes: parseInt(e.target.value) },
                  updateEndDate,
                );
              }}
            />
          </HStack>
        )}
      </VStack>
      <Center
        onClick={() => {
          remove();
          reset();
        }}
        p={{ '@bp1': 3, '@bp3': 4 }}
        borderTop={1}
        borderColor='base200'
        _hover={{ backgroundColor: '#f2464617' }}
      >
        <Text size={{ '@bp1': 2, '@bp3': 3 }} weight={500} color='danger'>
          Remove poll
        </Text>
      </Center>
    </VStack>
  );
}
AddPoll.displayName = 'AddPoll';

export default AddPoll;
