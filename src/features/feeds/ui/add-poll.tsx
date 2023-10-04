import {
  Box,
  Center,
  CircularProgress,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Select,
  Switch,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { CreatePostInput } from '../shared';
import { arrayFrom, useRecordState } from '../../../shared';
import dayjs from 'dayjs';

function Choice({
  title,
  value,
  update,
}: {
  title: string;
  value: string;
  update: (value: string) => void;
}) {
  const MAXIMUM_CHARACTERS = 25;

  return (
    <Box>
      <InputGroup>
        <Input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update(e.target.value)
          }
          maxLength={MAXIMUM_CHARACTERS}
          placeholder={title}
        />
        <InputGroup.RightElement>
          <CircularProgress
            thickness={3}
            value={Math.ceil((value.length / MAXIMUM_CHARACTERS) * 100)}
          />
        </InputGroup.RightElement>
      </InputGroup>
    </Box>
  );
}

interface ITime {
  days: number;
  hours: number;
  minutes: number;
}

function AddPoll({
  update,
  remove,
  reset,
  increaseHeight,
}: {
  update: (state: Partial<CreatePostInput>) => void;
  remove: VoidFunction;
  reset: VoidFunction;
  increaseHeight: (amount: number) => void;
}) {
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
            <Choice
              key={`choice-${idx + 1}`}
              title={`Choice ${idx + 1}`}
              value={responses[idx]}
              update={(value) => updatePoll(value, idx)}
            />
          ))}
          {responses.length < MaximumOptions && (
            <HStack
              py={4}
              gap={3}
              as='button'
              role='button'
              items='center'
              justify='center'
              bgColor='base100'
              radius={2}
              _hover={{ backgroundColor: '$base200' }}
              onClick={() => {
                increaseHeight(62.5);
                addPoll();
              }}
            >
              <Icon color='base600' name='add' size='lg' />
              <Text weight={500} color='base600'>
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
        <VStack gap={1}>
          <HStack justify='space-between'>
            <Heading casing='capitalize' size={3} as='h5'>
              Open Poll
            </Heading>
            <Switch
              value={`${withEndDate}`}
              onChange={(e) =>
                e.target.value === 'true' ? turnOff() : turnOn()
              }
            />
          </HStack>
          <Text size={2} color='base400'>
            While enabled, users will be able to to vote on the poll
            forever.
          </Text>
        </VStack>
        {withEndDate && (
          <HStack gap={4}>
            <FormControl>
              <FormControl.Label>Days</FormControl.Label>
              <Select
                value={time.days}
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
              >
                {arrayFrom(8)
                  .filter((num) => num >= startFrom.days)
                  .map((num) => (
                    <option key={`${num} days`} value={num}>
                      {num}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Hours</FormControl.Label>
              <Select
                value={time.hours}
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
              >
                {arrayFrom(24)
                  .filter((num) => num >= startFrom.hours)
                  .map((num) => (
                    <option key={`${num} days`} value={num}>
                      {num}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Minutes</FormControl.Label>
              <Select
                value={time.minutes}
                onChange={(e) => {
                  updateTime(
                    { minutes: parseInt(e.target.value) },
                    updateEndDate,
                  );
                }}
              >
                {arrayFrom(60)
                  .filter((num) => num >= startFrom.minutes)
                  .map((num) => (
                    <option key={`${num} days`} value={num}>
                      {num}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </HStack>
        )}
      </VStack>
      <Center
        onClick={() => {
          remove();
          reset();
        }}
        p={4}
        borderTop={1}
        borderColor='base200'
        _hover={{ backgroundColor: '#f2464617' }}
      >
        <Text weight={500} color='danger'>
          Remove poll
        </Text>
      </Center>
    </VStack>
  );
}
AddPoll.displayName = 'AddPoll';

export default AddPoll;
