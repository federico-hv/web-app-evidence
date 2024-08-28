import {
  Button,
  Heading,
  HStack,
  Switch,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { useEffect, useState } from 'react';
import {
  makeButtonLarger,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useArrayState,
  useRecordState,
} from '../../../../../shared';
import dayjs from 'dayjs';
import { PollAnswerInput, SelectTime } from '../../inputs';
import { AddPollProps, ITime } from './types';

function AddPoll({ update }: AddPollProps) {
  const MaximumOptions = 4;
  const [responses, add, replace, remove] = useArrayState(['', '']);
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
  }, [responses]);

  return (
    <VStack
      position='relative'
      radius={1}
      gap={4}
      pb={4}
      css={{ flexShrink: 0 }}
    >
      <Heading size={3} weight={500} color='white500'>
        Options
      </Heading>
      <VStack h='full' w='full' gap={3}>
        {responses.map((_, idx) => (
          <PollAnswerInput
            key={`choice-${idx + 1}`}
            title={`Choice ${idx + 1}`}
            value={responses[idx]}
            update={(value) => replace(idx, value)}
            remove={() => remove((_, index) => idx !== index)}
          />
        ))}
        {responses.length < MaximumOptions && (
          <Button
            leftIcon='add'
            variant='ghost'
            radius={2}
            colorTheme='white700'
            onClick={() => add('')}
          >
            Add Choice
          </Button>
        )}
      </VStack>

      {/* End time picker */}
      <VStack gap={3}>
        <HStack
          as='label'
          cursor='pointer'
          gap={4}
          items='flex-start'
          css={{ userSelect: 'none' }}
        >
          <TextGroup color='white500'>
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
            colorTheme={withEndDate ? 'white700' : 'purple500'}
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            value={String(withEndDate)}
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
              value={String(time.days)}
              numberOfOptions={8}
              onValueChange={(value) => {
                const _value = parseInt(value);

                if (_value === 0) {
                  // -> if hours 0, and minutes 0; set hours to 1
                  if (time.hours === 0 && time.minutes === 0) {
                    updateTime({ hours: 1 });
                  }
                }
                updateTime({ days: _value }, updateEndDate);
              }}
            />
            <SelectTime
              startFrom={startFrom.hours}
              name='hours'
              value={String(time.hours)}
              numberOfOptions={24}
              onValueChange={(value) => {
                updateStartFrom({ minutes: 0 });
                const _value = parseInt(value);
                if (_value === 0) {
                  // -> if minutes 0 and days 0; set minutes to 15
                  if (time.minutes === 0 && time.days === 0) {
                    updateTime({ minutes: 15 });
                    updateStartFrom({ minutes: 15 });
                  }
                  // -> if hours > 0 or days > 0; skip
                }
                updateTime({ hours: _value }, updateEndDate);
              }}
            />
            <SelectTime
              startFrom={startFrom.minutes}
              name='minutes'
              value={String(time.minutes)}
              numberOfOptions={60}
              onValueChange={(value) => {
                updateTime({ minutes: parseInt(value) }, updateEndDate);
              }}
            />
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}
AddPoll.displayName = 'AddPoll';

export default AddPoll;
